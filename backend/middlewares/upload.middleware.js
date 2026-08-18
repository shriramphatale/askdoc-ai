import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};
  
const upload = multer({ storage: storage, fileFilter: fileFilter })

// Error handling middleware for multer
const uploadErrorHandler = (err, req, res, next) => { 
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } 

  if (err) {
    return res.status(500).json({ message: err.message });
  }

  next()
};

export { upload, uploadErrorHandler };