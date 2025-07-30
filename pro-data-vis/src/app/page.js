'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/player/${searchQuery}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Search for a pro player</h1>
        </div>

        <div className="relative">
          <div className="relative">
            <div
              className={`relative bg-gray-800 rounded-3xl shadow-xl transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-600 shadow-blue-500/20' : 'hover:shadow-gray-700/50'}`}
            >
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <Search
                  className={`w-6 h-6 transition-colors duration-200 ${isFocused ? 'text-blue-400' : 'text-gray-400'}`}
                />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
                placeholder="Pro player..."
                className="w-full bg-transparent text-white text-xl md:text-2xl py-6 md:py-8 pl-16 pr-16 rounded-3xl focus:outline-none placeholder-gray-500"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Subtle animation dots */}
          <div className="absolute -top-20 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}
