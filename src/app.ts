import express from "express";
import cors from "cors";
import votingRouter from "./routes/voting.router";
import suggestionsRouter from "./routes/suggestions.router";

const app = express();

app.set('trust proxy', true);

app.use(cors());
app.use(express.json());

app.use('/api/votes', votingRouter);
app.use('/api/suggestions', suggestionsRouter);

export default app;