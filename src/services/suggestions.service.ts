import { sequelize } from "../config/sequelize";
import Suggestion from '../models/suggestion.model';

export default class SuggestionService {
    constructor() {
        console.log('[Suggestion Service]', 'Initialized');
    }

    async createSuggestion(title: string, description: string) {
        return await sequelize.models.Suggestion.create({
            title,
            description
        });
    }

    async getAllSuggestions() {
        return await sequelize.models.Suggestion.findAll({
            attributes: {
                exclude: ['deletedAt']
            }
        });
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