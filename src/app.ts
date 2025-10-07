import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import votingRouter from "./routes/voting.router";
import suggestionsRouter from "./routes/suggestions.router";
import path from "path";

const app = express();

app.set('trust proxy', true);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/votes', votingRouter);
app.use('/api/suggestions', suggestionsRouter);
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;