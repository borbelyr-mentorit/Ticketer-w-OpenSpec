"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// @ts-ignore
const init_1 = __importDefault(require("../../../database/init"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Task 2.3 & 2.4: Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5002' // Admin Frontend port per tasks.md
}));
app.use(express_1.default.json());
// Task 2.5: Database initialization
(0, init_1.default)();
// Task 2.7: API Route prefix
const apiRouter = express_1.default.Router();
// Task 2.6: Health check
apiRouter.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log(`Admin Backend server running on port ${PORT}`);
});
