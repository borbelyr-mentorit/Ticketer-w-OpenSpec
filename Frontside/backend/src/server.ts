import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import path from 'path';
// @ts-ignore
import initializeDatabase from '../../../database/init';

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors({
    origin: 'http://localhost:5004',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Initialize Database
try {
    initializeDatabase();
} catch (err) {
    console.error('Database initialization failed:', err);
}

// API Routes
const apiRouter: Router = express.Router();

// Health Check
apiRouter.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'Frontside Backend' });
});

app.use('/api', apiRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Frontside Backend server running on http://localhost:${PORT}`);
});
