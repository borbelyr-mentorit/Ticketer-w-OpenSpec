import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db';

interface Event {
    id?: number;
    name: string;
    presenter: string;
    date: string;
    fromTime: string;
    toTime: string;
    description: string;
    ticketIdPrefix: string;
    image: string | null;
}

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

// Task 4: Events REST API - List Endpoint
router.get('/', (req: Request, res: Response) => {
    const query = 'SELECT * FROM Events';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Task 5: Events REST API - Get Single Event Endpoint
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Events WHERE id = ?';
    db.get(query, [id], (err, row: any) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(row);
    });
});

// Task 6: Events REST API - Create Event Endpoint
router.post('/', (req: Request, res: Response) => {
    const { name, presenter, date, fromTime, toTime, description, ticketIdPrefix } = req.body;
    
    if (!name || !presenter || !date || !fromTime || !toTime || !ticketIdPrefix) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `INSERT INTO Events (name, presenter, date, fromTime, toTime, description, ticketIdPrefix) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, presenter, date, fromTime, toTime, description, ticketIdPrefix];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

// Task 7: Events REST API - Update Event Endpoint
router.patch('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates);
    
    if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE Events SET ${setClause} WHERE id = ?`;
    const params = [...Object.values(updates), id];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        db.get('SELECT * FROM Events WHERE id = ?', [id], (err, updatedRow: any) => {
            res.status(200).json(updatedRow);
        });
    });
});

// Task 8: Events REST API - Delete Event Endpoint
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    
    db.run('DELETE FROM Events WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    });
});

// Task 9: Events REST API - Image Upload Endpoint
router.post('/:id/image', upload.single('image'), (req: Request, res: Response) => {
    const { id } = req.params;
if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded. Make sure to use "image" as the field name in form-data.' });
    }

    const imagePath = `uploads/events/${req.file?.filename}`;
    
    // Get the current image path before updating
    db.get('SELECT image FROM Events WHERE id = ?', [id], (err, row: any) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Event not found' });

        const oldImagePath = (row as Event).image;

        db.run('UPDATE Events SET image = ? WHERE id = ?', [imagePath, id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Delete old image file if it exists and is different from the new one
            if (oldImagePath && oldImagePath !== imagePath) {
                const absoluteOldPath = path.resolve(__dirname, '../../', oldImagePath);
                fs.unlink(absoluteOldPath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }

            db.get('SELECT * FROM Events WHERE id = ?', [id], (err, updatedRow: any) => {
                res.status(200).json(updatedRow);
            });
        });
    });
});

export default router;
