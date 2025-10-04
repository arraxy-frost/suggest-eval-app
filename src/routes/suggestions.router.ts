import express, { Router } from "express";
import SuggestionsController from "../controllers/suggestions.controller";

const router = express.Router();
const suggestionsController = new SuggestionsController();

router.get('/', suggestionsController.getAllSuggestions);
router.post('/', suggestionsController.createSuggestion);
router.post('/search', suggestionsController.searchSuggestions);
router.delete('/:id', suggestionsController.deleteSuggestion);
router.patch('/:id', suggestionsController.updateSuggestion);

export default router;