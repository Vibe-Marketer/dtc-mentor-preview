#!/bin/bash
curl -s -X POST http://localhost:3000/api/roast \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.shopify.com"}' | jq .
