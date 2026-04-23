import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "redis";
import dotenv from 'dotenv';
import { RedisVectorStore } from "@langchain/redis";
import { specificDocs } from "./docs.js";
dotenv.config();

const client = createClient({
    url: "redis://localhost:6379"
});

await client.connect();

const embeddings = new OpenAIEmbeddings({
   apiKey: process.env.TIENDVD_OPENAI_API_KEY, 
   model: "text-embedding-3-large"
});

const vectorStore = new RedisVectorStore(embeddings, {
    redisClient: client,
    indexName: "banner-docs"
});

await vectorStore.addDocuments(specificDocs);

await client.disconnect();