'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const NavbarSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const width = isFocused ? 'w-64' : 'w-12';
  const placeholder = isFocused ? 'Search...' : '';

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
    <div className={`relative flex items-center transition-all duration-200 ${width}`}>
      <Search
        className={`absolute h-4 w-4 text-gray-400 pointer-events-none z-10 transition-all duration-200 ${isFocused ? 'left-3 translate-x-0' : 'left-1/2 -translate-x-1/2'}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={isFocused ? searchValue : ""}
        onChange={(e) => setSearchValue(e.target.value)}
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
    </div>
  );
};

export default NavbarSearch;
