import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { QdrantVectorStore } from '@langchain/qdrant'
import { ENV } from '../config/env.js'

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: ENV.GOOGLE_API_KEY,
    model: 'gemini-embedding-2'
});

const getVectorStore = async () => { 
    return  await QdrantVectorStore.fromExistingCollection(
        embeddings, {
            url: ENV.QDRANT_URL,
            // apiKey:ENV.QDRANT_API_KEY,
            collectionName: "askdoc_documents",
        });
}

const addChunksToVectorStore = async ( chunks ) => {
    const vectorStore = await getVectorStore();
    await vectorStore.addDocuments(chunks);
}

const retrieveRelevantChunks = async ( question, userId, documentId ) => {
    const vectorStore = await getVectorStore();

    const result = await vectorStore.similaritySearch(
        question,
        5,
        {
            must: [
                {
                    key: "metadata.userId",
                    match: {
                        value: userId
                    }
                },
                {
                    key: "metadata.documentId",
                    match: {
                        value: documentId
                    }
                }
            ] 
        }
    );

    return result;
};


export { getVectorStore, addChunksToVectorStore, retrieveRelevantChunks };