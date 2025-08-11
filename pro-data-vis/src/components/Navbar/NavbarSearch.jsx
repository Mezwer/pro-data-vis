'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const NavbarSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // Handle search logic here
    }
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="relative">
      <div className={`relative flex items-center transition-all duration-200`}>
        <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-64 h-9 pl-10 pr-10 text-sm
            bg-neutral-200 hover:bg-neutral-100
            border border-transparent
            rounded-full
            transition-all duration-200
            focus:outline-none focus:bg-neutral-100
            text-gray-400
            placeholder:text-gray-400
            ${isFocused ? 'shadow-md !text-gray-500' : 'shadow-sm'}
          `}
        />
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 p-0.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-3 w-3 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarSearch;
