import { Request, Response } from "express";
import { normalizeIp } from "../utils/normalize-ip";
import { VotesService } from "../services/votes.service";

export class VotesController {
    private votesService: VotesService;

    constructor() {
        console.log('Init voting controller');
        this.votesService = new VotesService();
    }

    private getClientIp = (req: Request) => {
        return normalizeIp(req.ip);
    }

    getSuggestionVotes = async (req: Request, res: Response) => {
        const { suggestionId } = req.params;

        if (!suggestionId) {
            return res.status(400).json({
                message: "Suggestion not provided in body"
            })
        };

        return res.json(await this.votesService.getSuggestionVotesById(Number(suggestionId)));
    }

    addVote = async (req: Request, res: Response) => {
        const { suggestionId } = req.params;

        if (!suggestionId) {
            return res.status(400).json({
                message: "Suggestion ID is required in URL params"
            });
        }

        const result = await this.votesService.addVote(
            Number(suggestionId), 
            this.getClientIp(req)
        );

        if (result.success) {
            res.json(result.data);
        } else {
            res.status(result?.status ?? 500).json({
                message: result.message
            })
        }
    }

    deleteVote = async (req: Request, res: Response) => {
        const { suggestionId } = req.params;

        if (!suggestionId) {
            return res.status(400).json({
                message: "Suggestion not provided in body"
            })
        };

        const deletionResult = await this.votesService.deleteVote(
            Number(suggestionId),
            this.getClientIp(req)
        )

        return res.json(deletionResult)
    }
}