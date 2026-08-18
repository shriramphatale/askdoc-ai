import express from 'express'
import { uploadDocument, getAllDocuments, getDocument, deleteDocument } from '../controllers/document.controller.js'
import { upload, uploadErrorHandler } from '../middlewares/upload.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authMiddleware) // Apply authentication middleware to all routes

router.post('/', upload.single('file'), uploadErrorHandler, uploadDocument) 
router.get('/', getAllDocuments)
router.get('/:id', getDocument)
router.delete('/:id', deleteDocument)

export default router