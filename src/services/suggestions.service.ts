import { PaginatedResponse } from "../common/paginated-response.interface";
import { sequelize } from "../config/sequelize";
import Suggestion from '../models/suggestion.model';

export default class SuggestionService {
    constructor() {
        console.log('[Suggestion Service]', 'Initialized');
    }

    async getAllSuggestions() {
        return await sequelize.models.Suggestion.findAll({
            attributes: {
                exclude: ['deletedAt']
            }
        });
    }

    async getSuggestion(suggestionId: number) {
        const suggestion = await sequelize.models.Suggestion.findOne({
            where: {
                id: suggestionId
            },
            include: [
                {
                    model: sequelize.models.Vote,
                    as: 'votes',
                    attributes: []
                }
            ],
            attributes: {
                exclude: ['deletedAt'],
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('votes.id')),
                        'votesCount'
                    ]
                ]
            },
            group: ['Suggestion.id'],
            subQuery: false
        });

        return suggestion;
    }

    async createSuggestion(title: string, description: string) {
        return await sequelize.models.Suggestion.create({
            title,
            description
        });
    }

    async searchSuggestions(limit: number, page: number): Promise<PaginatedResponse<Suggestion>> {
        const { count, rows } = await sequelize.models.Suggestion.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: sequelize.models.Vote,
                    as: 'votes',
                    attributes: []
                }
            ],
            attributes: {
                exclude: ['deletedAt'],
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('votes.id')),
                        'votesCount'
                    ]
                ]
            },
            group: ['Suggestion.id'],
            subQuery: false
        });

        return {
            count: Array.isArray(count) ? count.length : count, // count может быть массивом при group
            limit,
            page,
            totalPages: Math.ceil(
            (Array.isArray(count) ? count.length : count) / limit
            ),
            rows
        } as PaginatedResponse<Suggestion>;
    }

    async deleteSuggestion(id: number) {
        return await sequelize.models.Suggestion.destroy({
            where: {
                id
            }
        })
    }

    async updateSuggestion(id: number, update: any) {
        return await sequelize.models.Suggestion.update(update, {
            where: {
                id
            }
        })
    }
}