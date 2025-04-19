import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
    getStudentProfile, 
    updateStudentProfile,
    uploadDocument,
    removeDocument
} from '../controllers/student.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Get student profile
router.get('/student-profile/:id', authenticateToken, getStudentProfile);

// Update student profile
router.put('/student-profile/:id', authenticateToken, updateStudentProfile);

// Upload document
router.post('/student-profile/:id/upload-document', 
    authenticateToken, 
    upload.single('file'),
    uploadDocument
);

// Remove document
router.delete('/student-profile/:id/remove-document/:type', 
    authenticateToken, 
    removeDocument
);

export default router; 