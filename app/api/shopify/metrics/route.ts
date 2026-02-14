import { NextRequest, NextResponse } from 'next/server';

interface ShopifyOrder {
  id: number;
  total_price: string;
  created_at: string;
  customer: {
    id: number;
    orders_count: number;
  };
  line_items: Array<{
    quantity: number;
    price: string;
  }>;
}

interface StoreMetrics {
  // Revenue
  totalRevenue30d: number;
  totalRevenue90d: number;
  totalOrders30d: number;
  totalOrders90d: number;
  aov: number;
  
  // Customers
  totalCustomers: number;
  newCustomers30d: number;
  repeatCustomerRate: number;
  
  // Products
  totalProducts: number;
  
  // Calculated metrics
  estimatedMonthlyRevenue: number;
  revenueGrowth: number; // 30d vs prior 30d
}

export async function POST(req: NextRequest) {
  try {
    const { shop, accessToken } = await req.json();
    
    if (!shop || !accessToken) {
      return NextResponse.json({ error: 'Shop and accessToken required' }, { status: 400 });
    }
    
    const baseUrl = `https://${shop}/admin/api/2024-01`;
    const headers = {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    };
    
    // Fetch orders from last 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const ordersResponse = await fetch(
      `${baseUrl}/orders.json?status=any&created_at_min=${ninetyDaysAgo.toISOString()}&limit=250`,
      { headers }
    );
    const ordersData = await ordersResponse.json();
    const orders: ShopifyOrder[] = ordersData.orders || [];
    
    // Fetch customer count
    const customersResponse = await fetch(
      `${baseUrl}/customers/count.json`,
      { headers }
    );
    const customersData = await customersResponse.json();
    
    // Fetch product count
    const productsResponse = await fetch(
      `${baseUrl}/products/count.json`,
      { headers }
    );
    const productsData = await productsResponse.json();
    
    // Calculate metrics
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    
    // Filter orders by time period
    const orders30d = orders.filter(o => new Date(o.created_at) >= thirtyDaysAgo);
    const orders30to60d = orders.filter(o => {
      const date = new Date(o.created_at);
      return date >= sixtyDaysAgo && date < thirtyDaysAgo;
    });
    
    // Revenue calculations
    const totalRevenue30d = orders30d.reduce((sum, o) => sum + parseFloat(o.total_price), 0);
    const totalRevenue30to60d = orders30to60d.reduce((sum, o) => sum + parseFloat(o.total_price), 0);
    const totalRevenue90d = orders.reduce((sum, o) => sum + parseFloat(o.total_price), 0);
    
    // AOV
    const aov = orders30d.length > 0 ? totalRevenue30d / orders30d.length : 0;
    
    // Repeat customer rate
    const customersWithMultipleOrders = new Set(
      orders.filter(o => o.customer?.orders_count > 1).map(o => o.customer?.id)
    );
    const uniqueCustomers = new Set(orders.map(o => o.customer?.id));
    const repeatRate = uniqueCustomers.size > 0 
      ? (customersWithMultipleOrders.size / uniqueCustomers.size) * 100 
      : 0;
    
    // New customers (first order in last 30 days)
    const newCustomers30d = orders30d.filter(o => o.customer?.orders_count === 1).length;
    
    // Revenue growth
    const revenueGrowth = totalRevenue30to60d > 0 
      ? ((totalRevenue30d - totalRevenue30to60d) / totalRevenue30to60d) * 100
      : 0;
    
    const metrics: StoreMetrics = {
      totalRevenue30d: Math.round(totalRevenue30d * 100) / 100,
      totalRevenue90d: Math.round(totalRevenue90d * 100) / 100,
      totalOrders30d: orders30d.length,
      totalOrders90d: orders.length,
      aov: Math.round(aov * 100) / 100,
      totalCustomers: customersData.count || 0,
      newCustomers30d,
      repeatCustomerRate: Math.round(repeatRate * 10) / 10,
      totalProducts: productsData.count || 0,
      estimatedMonthlyRevenue: Math.round(totalRevenue30d * 100) / 100,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
    };
    
    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
