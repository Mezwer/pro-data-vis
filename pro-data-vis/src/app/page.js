'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { players } from '@/constants/players';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner/Spinner';
import Fuse from 'fuse.js';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const [focus, setFocus] = useState(-1);
  const [error, setError] = useState(false);

  const fuse = new Fuse(players, { threshold: 0.4, keys: ['player'] });
  const fuseResult = fuse.search(searchQuery, { limit: 8 });

  const searchPlayer = (player) => {
    setLoading(true);
    router.push(`/player/${player}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (focus !== -1) {
      searchPlayer(fuseResult[focus].item.player);
      return;
    }

    if (players.includes(searchQuery)) {
      searchPlayer(searchQuery);
      return;
    }

    toast('Invalid player name. Please try again or select a player from the dropdown.', {
      style: { background: '#111827', color: 'white', border: 'none' },
    });
    setError(true);
  };

  const handleKeyUp = (e) => {
    if (fuseResult.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown' && focus !== fuseResult.length - 1) {
      setFocus(focus + 1);
    } else if (e.key === 'ArrowUp' && focus !== -1) {
      setFocus(focus - 1);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-4xl mt-[5%]">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Search for a pro player</h1>
        </div>

        <div
          className={`relative flex flex-row bg-gray-800 rounded-3xl shadow-xl transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-600 shadow-blue-500/20' : 'hover:shadow-gray-700/50'} ${error ? '!ring-red-500 !shadow-red-500/20' : ''}`}
        >
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
            <Search
              className={`w-6 h-6 transition-colors duration-200 ${isFocused ? 'text-blue-400' : 'text-gray-400'}`}
            />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFocus(-1);
              setError(false);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              } else {
                handleKeyUp(e);
              }
            }}
            placeholder="Pro player..."
            className="w-full bg-transparent text-white text-xl md:text-2xl py-6 md:py-8 pl-16 pr-16 rounded-3xl focus:outline-none placeholder-gray-500"
          />

          {searchQuery && !loading && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          )}
          {loading && (
            <div className="w-6 h-6 absolute right-6 top-1/2 transform -translate-y-1/2">
              <Spinner />
            </div>
          )}

          {fuseResult.length > 0 && isFocused && (
            <div
              className="absolute transform top-full translate-y-[10px] w-full rounded-xl text-center bg-gray-800"
              onMouseDown={(e) => e.preventDefault()}
            >
              {fuseResult.map((player, index) => (
                <div
                  className={`relative flex flex-row justify-center items-center font-semibold text-2xl w-full h-full rounded-xl border border-2 py-3 z-5 ${focus === index ? 'border-blue-600 bg-slate-900' : 'border-gray-800'}`}
                  key={index}
                  onMouseMove={() => setFocus(index)}
                  onClick={() => {
                    searchPlayer(player.item.player);
                    setIsFocused(false);
                  }}
                >
                  <div className="absolute left-0 ml-2 flex flex-row gap-1">
                    {player.item.leagues.includes('LCK') && <img src="/lck.svg" width={40} height={60} />}
                    {player.item.leagues.includes('LPL') && <img src="/lpl.svg" width={40} height={60} />}
                    {(player.item.leagues.includes('NA LCS') || player.item.leagues.includes('LCS')) && (
                      <img src="/lcs.svg" width={40} height={60} />
                    )}
                    {(player.item.leagues.includes('EU LCS') || player.item.leagues.includes('LEC')) && (
                      <img src="/lec.svg" width={30} height={60} className="ml-1" />
                    )}
                  </div>
                  {player.item.player}
                  <span className="mr-2 bg-gray-900/70 px-3 py-1 rounded-full font-medium text-xs text-center absolute right-0">
                    {player.item.teams.slice(0, 3).join(', ')}
                    {player.item.teams.length > 3 ? ', ...' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
