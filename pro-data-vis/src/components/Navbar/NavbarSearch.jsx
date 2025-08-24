'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { players } from '@/constants/players';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Fuse from 'fuse.js';

const NavbarSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const width = isFocused ? 'w-64' : 'w-12';
  const placeholder = isFocused ? 'Search...' : '';

  // search stuff, make into component soon
  const fuse = new Fuse(players, { threshold: 0.4, keys: ['player'] });
  const fuseResult = fuse.search(searchValue, { limit: 8 });
  const [focus, setFocus] = useState(-1);

  const clearSearch = () => {
    setSearchValue('');
  };

  const searchPlayer = (name) => {
    router.push(`/player/${name}`);
    clearSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (focus !== -1) {
        searchPlayer(fuseResult[focus].item);
        return;
      } else if (players.includes(searchValue.trim())) {
        searchPlayer(searchValue.trim());
        return;
      }

      toast.error('Invalid player name. Please try again or select a player from the dropdown.', {
        style: { background: '#111827', color: 'white', border: 'none' },
      });
    }

    if (e.key === 'ArrowDown' && focus < fuseResult.length - 1) {
      setFocus(focus + 1);
    }

    if (e.key === 'ArrowUp' && focus >= 1) {
      setFocus(focus - 1);
    }
  };

  return (
    <div className={`relative flex items-center transition-all duration-200 ${width}`}>
      <Search
        className={`absolute h-4 w-4 text-gray-400 pointer-events-none z-10 transition-all duration-200 ${isFocused ? 'left-3 translate-x-0' : 'left-1/2 -translate-x-1/2'}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={isFocused ? searchValue : ''}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setFocus(-1);
        }}
        onKeyUp={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          h-9 text-sm absolute
          bg-neutral-300 hover:bg-neutral-100
          border border-transparent
          rounded-full
          transition-all duration-200
          text-gray-400
          placeholder:text-gray-400
          focus:outline-none focus:bg-neutral-100
          ${isFocused ? 'pl-10 pr-10 shadow-md !text-gray-500' : 'px-2'} 
          ${width}
        `}
      />
      {searchValue && isFocused && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 p-0.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X className="h-3 w-3 text-gray-400" />
        </button>
      )}

      {isFocused && (
        // should make this into component soon
        <div
          className={`${fuseResult.length > 0 ? 'max-h-96' : 'max-h-0'} absolute overflow-hidden transition-all duration-150 top-full left-0 translate-y-[20px] z-10 bg-neutral-100 w-full rounded-xl flex flex-col`}
          onMouseDown={(e) => e.preventDefault()}
        >
          {fuseResult.map((player, index) => (
            <span
              className={`${focus === index ? 'bg-neutral-200' : ''} w-full h-full text-black text-center rounded-xl py-2`}
              onMouseMove={() => setFocus(index)}
              onClick={() => searchPlayer(player.item.player)}
            >
              {player.item.player}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
