import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface DocumentChunk {
  id: string;
  text: string;
  section: string;
  embedding?: number[];
}

export interface EmbeddingsStore {
  chunks: DocumentChunk[];
  model: string;
  createdAt: string;
}

// Chunk the knowledge base by sections
export function chunkKnowledgeBase(content: string): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const lines = content.split('\n');
  
  let currentSection = '';
  let currentChunk = '';
  let chunkId = 0;
  
  for (const line of lines) {
    // New main section (##)
    if (line.startsWith('## ')) {
      // Save previous chunk if exists
      if (currentChunk.trim()) {
        chunks.push({
          id: `chunk-${chunkId++}`,
          text: currentChunk.trim(),
          section: currentSection,
        });
      }
      currentSection = line.replace('## ', '');
      currentChunk = line + '\n';
    }
    // New subsection (###) - start new chunk within section
    else if (line.startsWith('### ')) {
      if (currentChunk.trim() && currentChunk.split('\n').length > 2) {
        chunks.push({
          id: `chunk-${chunkId++}`,
          text: currentChunk.trim(),
          section: currentSection,
        });
      }
      currentChunk = `## ${currentSection}\n${line}\n`;
    }
    else {
      currentChunk += line + '\n';
    }
  }
  
  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push({
      id: `chunk-${chunkId++}`,
      text: currentChunk.trim(),
      section: currentSection,
    });
  }
  
  return chunks;
}

// Generate embedding for a single text
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

// Generate embeddings for all chunks
export async function generateAllEmbeddings(chunks: DocumentChunk[]): Promise<DocumentChunk[]> {
  const embeddedChunks: DocumentChunk[] = [];
  
  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.text);
    embeddedChunks.push({
      ...chunk,
      embedding,
    });
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return embeddedChunks;
}

// Cosine similarity between two vectors
export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Find most relevant chunks for a query
export async function findRelevantChunks(
  query: string,
  store: EmbeddingsStore,
  topK: number = 5
): Promise<DocumentChunk[]> {
  const queryEmbedding = await generateEmbedding(query);
  
  const scored = store.chunks.map(chunk => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding!),
  }));
  
  scored.sort((a, b) => b.score - a.score);
  
  return scored.slice(0, topK).map(s => s.chunk);
}

// Load embeddings store from file
export function loadEmbeddingsStore(): EmbeddingsStore | null {
  const storePath = path.join(process.cwd(), 'data', 'embeddings.json');
  
  if (!fs.existsSync(storePath)) {
    return null;
  }
  
  const data = fs.readFileSync(storePath, 'utf-8');
  return JSON.parse(data);
}
