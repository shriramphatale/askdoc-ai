import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { Document } from "../models/document.model.js";
import { generateAnswer } from "../services/gemini.service.js";
import { retrieveRelevantChunks } from "../services/vector.service.js";
import { redis } from "../config/redis.js";
import { checkQuestionQuota } from '../services/quata.service.js'
import { incrementQuestionUsage } from "../services/usage.service.js";

const askQuestion = async (req, res) => {
    try {
        const  { conversationId } = req.params;
        const { question } = req.body;

        if(!question?.trim()) {
            return res.status(400).json({message: "Question is required"});
        }

        const quota = await checkQuestionQuota(req.user);
        if (!quota.allowed) {
            return res.status(429).json({success: false,message: quota.message,used: quota.used,});
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user._id,
        });
        
        if(!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        // get document status
        let documentStatus = await redis.get(
            `document:status:${conversation.documentId}`
        );

        if(!documentStatus){
            const document = await Document.findOne({
                _id: conversation.documentId,
                userId: req.user._id,
            });
            
            if(!document){
                return res.status(404).json({ message: "Document not found" });
            }

            documentStatus = document.status;

            // add status to redis
            await redis.set(`document:status:${document._id}`, document.status, "EX", 3 * 60 * 60);
        }
        if(documentStatus !== "ready"){
            return res.status(400).json({message: "document is still being processed"});
        }

        const userMessage = await Message.create({
            conversationId,
            role: "user",
            content: question.trim(),
        });

        // Retrieve Chunks
        const relevantChunks = await retrieveRelevantChunks( question, req.user._id, conversation.documentId);

        const context = JSON.stringify(
            relevantChunks.map(chunk => ({
                content: chunk.pageContent,
                page: chunk.metadata.page
            }))
        );

        // get Ai response
        const aiAnswer = await generateAnswer(question, context);

        const aiMessage = await Message.create({
            conversationId,
            role: "assistant",
            content: aiAnswer.text
        });

        const updateData = { lastMessageAt: aiMessage.createdAt };
        if(conversation.title === "New Conversation"){
            updateData.title = question.trim();
        }
        await Conversation.updateOne({_id: conversationId}, {
            $set: updateData,
        });

        // update incr question in Usage model
        incrementQuestionUsage(req.user);

        return res.status(200).json({ data: aiMessage });

    } catch (error) {
        console.log("error in askQuestion: ", error);
        return res.status(500).json({message: "Failed to process question"})
    }
};

const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params
        
        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user._id,
        }).populate("documentId");

        if(!conversation){
            return res.status(404).json({message: "Conversation not found"});
        }

        const messages = await Message.find({ conversationId, }).sort({ createdAt: 1 });

        return res.status(200).json({ messages, document: conversation.documentId});

    } catch (error){
        console.log("error in getMessages: ",error);
        return res.status(500).json({message: "Failed to fetch messages"});
    }
};

const getRecentChats = async (req,res) => {
    try {
        const conversations = await Conversation.find({
            userId: req.user._id,
        }).sort({ lastMessageAt: -1 });

        return res.status(200).json({data: conversations})
    } catch (error) {
        console.log("error in getRecentChats: ", error)
        return res.status(500).json({message: "Failed to fetch recent chats"})
    }
}

const deleteConversation = async (req, res) => {
  try {
        const { conversationId } = req.params;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({
            success: false,
            message: "Conversation not found",
            });
        }

        await Message.deleteMany({
            conversationId,
        });

        await Conversation.deleteOne({
            _id: conversationId,
        });

        return res.status(200).json({ message: "Conversation deleted successfully",});
    } catch (error) {
        console.error("deleteConversation:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete conversation",
        });
    }
};

export { askQuestion, getMessages, getRecentChats, deleteConversation }