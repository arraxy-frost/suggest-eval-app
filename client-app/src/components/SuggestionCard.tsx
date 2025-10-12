import type { SuggestionItem } from "../types/suggestion-item.interface.ts";

interface SuggestionCardProps {
    suggestion: SuggestionItem;
    onVote: (id: number) => void;
}

export default function SuggestionCard({ suggestion, onVote }: SuggestionCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-gray-600 text-left">{suggestion.title}</h2>
            <p className="text-gray-600 text-left">{suggestion.description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">
                    Голосов: {suggestion.votesCount}
                </span>
                <button
                    onClick={() => onVote(suggestion.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-sm"
                >
                    Голосовать
                </button>
            </div>
        </div>
    );
}