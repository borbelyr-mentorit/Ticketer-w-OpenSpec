const express = require('express');
const cors = require('cors');
const path = require('path');
const initializeDatabase = require('../../database/init');

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
const apiRouter = express.Router();

// Health Check
apiRouter.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'Frontside Backend' });
});

app.use('/api', apiRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Frontside Backend server running on http://localhost:${PORT}`);
});
