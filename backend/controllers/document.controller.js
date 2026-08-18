import { Document } from '../models/document.model.js';
import cloudinary from '../config/cloudinary.js';
import { PDFDocument } from 'pdf-lib';
import fs from "fs";

const uploadDocument = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the uploaded PDF file and get the page count
        const pdfBytes = fs.readFileSync(req.file.path);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();

        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            use_filename: true,
            unique_filename: false,
        });

        // save document details to the database
        const document = new Document ({
            userId: req.user._id,
            title: uploadResponse.display_name,
            fileName: uploadResponse.display_name,
            fileUrl: uploadResponse.secure_url,
            fileSize: uploadResponse.bytes,
            pageCount: pageCount || 0,
        });

        const savedDocument = await document.save();

        res.status(201).json({ message: 'Document uploaded successfully', document: savedDocument });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document', error: error.message });
    }
}

const getDocument = async (req, res) => {
    try {
        const id = req.params.id;

        const document = await Document.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({ message: 'Document fetched successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document', error: error.message });
    }
}

const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'Documents fetched successfully', documents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
}

const deleteDocument = async (req, res) => {
    try {
        const id = req.params.id;

        const document = await Document.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({ message: 'Document deleted successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
}

export { uploadDocument, getDocument, getAllDocuments, deleteDocument };