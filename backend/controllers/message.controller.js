import { Conversation } from "../models/conversation.model"
import { Message } from "../models/message.model"

const askQuestion = async (req, res) => {
    try {
        const  { conversationId } = req.params;
        const { question } = req.body;

        if(!question?.trim()) {
            return res.status(400).json({message: "Question is required"});
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user._id,
        });

        if(!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const userMessage = await Message.create({
            conversationId,
            role: "user",
            content: question.trim(),
        });

        //Ai response
        const aiResponse = "sample ai response";

        const aiMessage = await Message.create({
            conversationId,
            role: "assistant",
            content: aiResponse
        });

        const updateData = { lastMessageAt: aiMessage.createdAt };
        if(conversation.title === "New Conversation"){
            updateData.title = question.trim();
        }
        await Conversation.updateOne({_id: conversationId}, {
            $set: updateData,
        });

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
        });

        if(!conversation){
            return res.status(404).json({message: "Conversation not found"});
        }

        const messages = await Message.find({ conversationId, }).sort({ createdAt: 1 });

        return res.status(200).json({data: messages});

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