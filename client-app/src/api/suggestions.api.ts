import axios from "axios";

const API_URL = 'http://localhost:8080/api/suggestions';

export async function searchSuggestions(page = 1, limit = 5) {
    const { data } = await axios.post(`${API_URL}/search`, { page, limit });
    return data;
}
