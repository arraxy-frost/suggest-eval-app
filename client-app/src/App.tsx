import './App.css'
import {useEffect, useState} from "react";
import type {SuggestionItem} from "./types/suggestion-item.interface.ts";
import {searchSuggestions} from "./api/suggestions.api.ts";
import SuggestionCard from "./components/SuggestionCard.tsx";
import {voteSuggestion} from "./api/vote.api.ts";

function App() {
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadSuggestions()
    }, [page])

    async function loadSuggestions() {
        try {
            setLoading(true);
            const data = await searchSuggestions(page);
            setSuggestions(data.rows);
            setTotalPages(data.totalPages);
        }
        catch (error: any) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleVote(id: number) {
        setError(null);

        const result = await voteSuggestion(id);

        if (result.error) {
            setError(result.message);
            setTimeout(() => setError(null), 3000);
        } else {
            await loadSuggestions();
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-8">
                Список предложений
            </h1>

            { loading && <p>Loading ...</p> }

            {!loading && suggestions.map(s => (
                <SuggestionCard key={s.id} suggestion={s} onVote={handleVote} />
            ))}

            <div className="flex justify-center gap-2 mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Назад
                </button>
                <span className="px-2 py-1 text-sm text-gray-500">
                    Страница {page} из {totalPages}
                </span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Вперед
                </button>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
    )
}

export default App
