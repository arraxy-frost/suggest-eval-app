import express from "express";
import { VotesController } from "../controllers/votes.controller";

const router = express.Router();
const votesController = new VotesController();

router.post('', votesController.addVote);

export default router;