import express from "express"
import { ENV } from "./config/env.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import documentRoutes from "./routes/document.routes.js"
import chatRoutes from "./routes/message.routes.js"

const app = express()

connectDB()

app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req,res) => {
  res.json({message: "API is running"})
})

app.use('/api/auth', authRoutes)
app.use('/api/documents', documentRoutes)
app.use('/api/chats', chatRoutes)

const PORT = ENV.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})