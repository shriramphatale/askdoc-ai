import { Worker } from 'bullmq';
import { extractPdfText } from '../services/pdf.service.js'
import { createChunks } from '../services/chunk.service.js';
import { addChunksToVectorStore } from '../services/vector.service.js'
import { Document } from '../models/document.model.js'
import connectDB from '../config/db.js'
import { redis } from '../config/redis.js';

await connectDB();

const documentWorker = new Worker("document-processing",
    async (job) => {
        console.log('Job: ', job.data)
        const data = job.data;

        // PDF -> Text
        const pdfData = await extractPdfText( data.fileUrl );        
        
        // Text -> Chunks
        const chunks = await createChunks({
            text: pdfData.text,
            documentId: data.documentId,
            userId: data.userId,
        })
        
        // Chunks -> embeddings -> Qdrant
        await addChunksToVectorStore( chunks );
        
        await Document.findByIdAndUpdate(
            data.documentId,
            {
                status: "ready",
                processingError: null,
            }
        );

        // add document status to Redis
        await redis.set(`document:status:${data.documentId}`, "ready", 'EX', 3 * 60 * 60);
        console.log('all chunks added to vector store');
    },
    {
        connection: {
            host: 'localhost',
            port: '6379',
        },
        concurrency: 100
    }
);

documentWorker.on('completed', (job) => {
    console.log("job completed ", job.id);
});

documentWorker.on('failed', async (job, err) => {
    console.log("job failed ", job.id, err.message);

    if( job ) {
        await Document.findByIdAndUpdate(
            job.data.documentId,
            {
                status: "failed",
                processingError: err.message,
            }
        );
    }
});