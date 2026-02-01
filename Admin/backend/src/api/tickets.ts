import express, { Request, Response } from 'express';
import db from '../db';

const router = express.Router();

// Task 11: Tickets REST API - List Ticket Types Endpoint
router.get('/', (req: Request, res: Response) => {
    const query = 'SELECT * FROM TicketTypes';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Task 10: Tickets REST API - Create Ticket Type Endpoint
router.post('/', (req: Request, res: Response) => {
    const { eventId, typeName, price, maxQuantity } = req.body;

    if (!eventId || !typeName || price === undefined || maxQuantity === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `INSERT INTO TicketTypes (eventId, typeName, price, maxQuantity, soldQuantity) 
                   VALUES (?, ?, ?, ?, 0)`;
    const params = [eventId, typeName, price, maxQuantity];

    db.run(query, params, function(err) {
        if (err) {
            if (err.message.includes('FOREIGN KEY constraint failed')) {
                return res.status(400).json({ error: 'Invalid eventId' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, ...req.body, soldQuantity: 0 });
    });
});

// Task 12: Tickets REST API - Update Ticket Type Endpoint
router.patch('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates);

    if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE TicketTypes SET ${setClause} WHERE id = ?`;
    const params = [...Object.values(updates), id];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Ticket type not found' });
        }
        db.get('SELECT * FROM TicketTypes WHERE id = ?', [id], (err, updatedRow: any) => {
            res.status(200).json(updatedRow);
        });
    });
});

// Task 13: Tickets REST API - Delete Ticket Type Endpoint
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    db.run('DELETE FROM TicketTypes WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Ticket type not found' });
        }
        res.status(200).json({ message: 'Ticket type deleted successfully' });
    });
});

export default router;
