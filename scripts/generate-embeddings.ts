import fs from 'fs';
import path from 'path';
import { chunkKnowledgeBase, generateAllEmbeddings, EmbeddingsStore } from '../lib/embeddings';

async function main() {
  console.log('Loading knowledge base...');
  const knowledgePath = path.join(process.cwd(), 'knowledge', 'dtc-frameworks.md');
  const content = fs.readFileSync(knowledgePath, 'utf-8');
  
  console.log('Chunking content...');
  const chunks = chunkKnowledgeBase(content);
  console.log(`Created ${chunks.length} chunks`);
  
  console.log('Generating embeddings (this may take a minute)...');
  const embeddedChunks = await generateAllEmbeddings(chunks);
  
  const store: EmbeddingsStore = {
    chunks: embeddedChunks,
    model: 'text-embedding-3-small',
    createdAt: new Date().toISOString(),
  };
  
  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'embeddings.json');
  fs.writeFileSync(outputPath, JSON.stringify(store, null, 2));
  
  console.log(`Embeddings saved to ${outputPath}`);
  console.log(`Total chunks: ${embeddedChunks.length}`);
}

main().catch(console.error);
