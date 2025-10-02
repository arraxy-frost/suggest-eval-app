import express from "express";
import cors from "cors";
import votingRouter from "./routes/voting.router"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vote', votingRouter);

export default app;