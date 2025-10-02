import express, { Router } from "express";
import { VotingController } from "../controllers/voting.controller";

const router = express.Router();
const votingController = new VotingController();

router.get('/', votingController.sayHi);

export default router;