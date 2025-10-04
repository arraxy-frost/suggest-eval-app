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

    async createSuggestion(title: string, description: string) {
        return await sequelize.models.Suggestion.create({
            title,
            description
        });
    }

    async searchSuggestions(limit: number, page: number): Promise<PaginatedResponse<Suggestion>> {
        const { count, rows } = await sequelize.models.Suggestion.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: {
                exclude: ['deletedAt']
            }
        })

        return {
            count,
            limit,
            page,
            totalPages: Math.ceil(count / limit),
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