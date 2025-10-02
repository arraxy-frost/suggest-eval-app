import { Request, Response } from "express";
import SuggestionService from "../services/suggestions.service";

export default class SuggestionsController {
    private suggestionsService: SuggestionService;

    constructor() {
        console.warn('[Suggestions Controller]', 'Initialized');
        this.suggestionsService = new SuggestionService();
    }

    createSuggestion = async (req: Request, res: Response) => {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Bad request. Title and description are expected in body."
            })
        }

        const result = await this.suggestionsService.createSuggestion(title, description);

        return res.json({
            success: true,
            data: result
        });
    }

    getAllSuggestions = async (req: Request, res: Response) => {
        const result = await this.suggestionsService.getAllSuggestions();

        return res.json({
            success: true,
            data: result
        });
    }

    deleteSuggestion = async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await this.suggestionsService.deleteSuggestion(Number(id));

        return res.json({
            success: result > 0,
            data: result
        });
    }

    updateSuggestion = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        const result = await this.suggestionsService.updateSuggestion(Number(id), req.body);

        return res.json({
            success: true,
            data: result
        })
    }
}