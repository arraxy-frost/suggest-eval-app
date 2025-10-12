import axios from "axios";

const API_URL = 'http://localhost:8080/api/votes';

export async function voteSuggestion(id: number) {
    try {
        const { data } = await axios.post(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                error: true,
                message: error.response?.data?.message || "Ошибка при голосовании",
                status: error.response?.status,
            };
        }

        return { error: true, message: "Неизвестная ошибка" };
    }
}