import express from "express";
import { VotesController } from "../controllers/votes.controller";

const router = express.Router();
const votesController = new VotesController();

router.get('/:suggestionId', votesController.getSuggestionVotes);
router.post('/:suggestionId', votesController.addVote);
router.delete('/:suggestionId', votesController.deleteVote);

export default router;