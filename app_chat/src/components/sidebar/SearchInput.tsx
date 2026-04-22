import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchInputProps {
    onSearch: (query: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
    const [query, setQuery] = useState('');

    const handleChange = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="px-4 pt-4 pb-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim pointer-events-none" />
                <input
                    type="text"
                    placeholder="Поиск чатов..."
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-bg border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-brand-text placeholder-brand-text-dim/50"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchInput;
