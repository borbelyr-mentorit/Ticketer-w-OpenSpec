import express, { Request, Response } from 'express';
import cors from 'cors';
// @ts-ignore
import initializeDatabase from '../../../database/init';

const app = express();
const PORT = process.env.PORT || 5001;

// Task 2.3 & 2.4: Middleware
app.use(cors({
    origin: 'http://localhost:5002' // Admin Frontend port per tasks.md
}));
app.use(express.json());

// Task 2.5: Database initialization
initializeDatabase();

// Task 2.7: API Route prefix
const apiRouter = express.Router();

// Task 2.6: Health check
apiRouter.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Admin Backend server running on port ${PORT}`);
});
