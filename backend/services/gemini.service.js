import { GoogleGenAI } from "@google/genai";
import { ENV } from "../config/env.js";

const ai = new GoogleGenAI({
    apiKey: ENV.GOOGLE_API_KEY
});

const generateAnswer = async ( question, context ) => {
    const prompt = `
        You are an AI assistant for a PDF document.
        Answer the user's question using only the provided context.

        If the answer cannot be found in the context, say:
        "I couldn't find the answer in this document."

        Context:
        ${context}

        Question:
        ${question}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
    });

    return response;
}

export {generateAnswer}