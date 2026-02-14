// Simple BM25-style text search - no external APIs required

export interface DocumentChunk {
  id: string;
  text: string;
  section: string;
  keywords: string[];
}

export interface SearchStore {
  chunks: DocumentChunk[];
  createdAt: string;
}

// Extract keywords from text
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
    'used', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it',
    'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

// Chunk the knowledge base by sections
export function chunkKnowledgeBase(content: string): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const lines = content.split('\n');
  
  let currentSection = '';
  let currentChunk = '';
  let chunkId = 0;
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentChunk.trim()) {
        chunks.push({
          id: `chunk-${chunkId++}`,
          text: currentChunk.trim(),
          section: currentSection,
          keywords: extractKeywords(currentChunk),
        });
      }
      currentSection = line.replace('## ', '');
      currentChunk = line + '\n';
    }
    else if (line.startsWith('### ')) {
      if (currentChunk.trim() && currentChunk.split('\n').length > 2) {
        chunks.push({
          id: `chunk-${chunkId++}`,
          text: currentChunk.trim(),
          section: currentSection,
          keywords: extractKeywords(currentChunk),
        });
      }
      currentChunk = `## ${currentSection}\n${line}\n`;
    }
    else {
      currentChunk += line + '\n';
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push({
      id: `chunk-${chunkId++}`,
      text: currentChunk.trim(),
      section: currentSection,
      keywords: extractKeywords(currentChunk),
    });
  }
  
  return chunks;
}

// BM25 scoring
function bm25Score(queryKeywords: string[], docKeywords: string[], avgDocLength: number, k1 = 1.5, b = 0.75): number {
  const docLength = docKeywords.length;
  const termFreqs = new Map<string, number>();
  
  for (const keyword of docKeywords) {
    termFreqs.set(keyword, (termFreqs.get(keyword) || 0) + 1);
  }
  
  let score = 0;
  for (const queryTerm of queryKeywords) {
    const tf = termFreqs.get(queryTerm) || 0;
    if (tf > 0) {
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (docLength / avgDocLength));
      score += numerator / denominator;
    }
  }
  
  return score;
}

// Find most relevant chunks for a query
export function findRelevantChunks(query: string, store: SearchStore, topK: number = 4): DocumentChunk[] {
  const queryKeywords = extractKeywords(query);
  
  if (queryKeywords.length === 0) {
    return [];
  }
  
  const avgDocLength = store.chunks.reduce((sum, c) => sum + c.keywords.length, 0) / store.chunks.length;
  
  const scored = store.chunks.map(chunk => ({
    chunk,
    score: bm25Score(queryKeywords, chunk.keywords, avgDocLength),
  }));
  
  scored.sort((a, b) => b.score - a.score);
  
  // Only return chunks with positive scores
  return scored
    .filter(s => s.score > 0)
    .slice(0, topK)
    .map(s => s.chunk);
}

// Create the search store (call this once at build time or startup)
export function createSearchStore(content: string): SearchStore {
  return {
    chunks: chunkKnowledgeBase(content),
    createdAt: new Date().toISOString(),
  };
}
