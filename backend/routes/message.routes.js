import express from "express"
import { askQuestion, getMessages, getRecentChats, deleteConversation } from "../controllers/message.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/:conversationId", askQuestion);
router.get("/:conversationId", getMessages);
router.delete("/:conversationId", deleteConversation);
router.get("/recents", getRecentChats)

export default router;