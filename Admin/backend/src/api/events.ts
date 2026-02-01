import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/events/');
    },
    filename: (req, file, cb) => {
        const eventId = req.params.id;
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${eventId}-${timestamp}${ext}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .jpg, .jpeg, .png, .gif, .webp are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    }
});

// Define event routes here
// router.get('/', (req, res) => { ... });

export default router;
