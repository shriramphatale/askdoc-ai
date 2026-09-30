import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from '@langchain/core/documents'

const createChunks = async ({ text, documentId, userId }) => {
    // text -> chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const document = new Document({
        pageContent: text,
        metadata: {
            documentId: documentId,
            userId: userId,
        },
    });

    const chunks = await splitter.splitDocuments([document])

    return chunks;
}

export { createChunks };