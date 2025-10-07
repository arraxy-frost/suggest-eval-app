import { sequelize } from "../config/sequelize";
import { UniqueConstraintError } from 'sequelize';

export class VotesService {
    private readonly VOTE_LIMIT = 10;
    
    constructor() {
        console.log('[Votes Service]', 'Initialized');
    }

    private async checkVoteQuote(suggestionId: number, ip: string) {
        const count = await sequelize.models.Vote.count({
            where: {
                sender: ip,
                suggestionId
            }
        });

        return count < this.VOTE_LIMIT;
    }

    async getSuggestionVotesById(suggestionId: number) {
        return await sequelize.models.Vote.findAndCountAll({
            where: {
                suggestionId
            }
        })
    }

    async addVote(suggestionId: number, ip: string) {
        try {
            const canVote = await this.checkVoteQuote(suggestionId, ip);

            if (!canVote) {
                return {
                    success: false,
                    status: 409,
                    message: 'Vote limit exceeded'
                }
            }

            const vote = await sequelize.models.Vote.create({
                suggestionId,
                sender: ip
            });

            return {
                success: true,
                data: vote.toJSON()
            };
        } catch (error: any) {
            if (error instanceof UniqueConstraintError) {
                return {
                    success: false,
                    status: 409,
                    message: "You have already voted for the suggestion"
                }
            }

            return {
                success: false,
                status: 500,
                message: error.message
            }
        }
    }

    async deleteVote(suggestionId: number, ip: string) {
        const deletedCount = await sequelize.models.Vote.destroy({
            where: { suggestionId, sender: ip }
        });

        if (deletedCount === 0) {
            return { success: false, message: 'Vote not found' };
        }

        return { success: true, message: 'Vote deleted successfully' };
    }
}