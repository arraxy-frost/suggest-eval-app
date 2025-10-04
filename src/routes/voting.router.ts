import express, { Router } from "express";
import { VotesController } from "../controllers/votes.controller";

const router = express.Router();
const votingController = new VotesController();

router.get('/', votingController.sayHi);

export default router;