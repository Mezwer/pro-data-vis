import React, { useState } from "react";
import { filters } from "@/constants/filters";
import { X } from 'lucide-react';

const FilterField = ({ champions }) => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showDrop, setShowDrop] = useState(true);
  const [options, setOptions] = useState(champions);
  const [hovering, setHovering] = useState(false);

  const handleKeyDown = (e) => {
    const trimmed = inputValue.trim();
    if (e.key === 'Enter' && trimmed && options.includes(trimmed)) {
      e.preventDefault();
      if (!chips.includes(trimmed)) {
        setChips([...chips, trimmed]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      const newChips = chips.slice(0, -1);
      setChips(newChips);
    }
  };

  const removeChip = (chipToRemove) => {
    const newChips = chips.filter(chip => chip !== chipToRemove);
    setChips(newChips);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const filteredOptions = champions.filter(champ => champ.toLowerCase().includes(value.toLowerCase()));
    setOptions(filteredOptions);
  }

  return (
    <div className="w-1/3 relative">
      <div 
        className="p-2 rounded-md flex flex-wrap gap-2 outline-none bg-[#1E202880] focus-within:ring-[1px] focus-within:ring-white"
      >
        {chips.map((chip) => (
          <div
            key={chip}
            className="flex items-center gap-1 px-2 bg-neutral-200 text-black rounded-full text-sm"
          >
            <span>{chip}</span>
            <button
              onClick={() => removeChip(chip)}
              className="hover:bg-neutral-300 rounded-full p-0.5 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] outline-none bg-transparent"
          placeholder={chips.length === 0 ? "Champion Name..." : ""}
          onBlur={() => setShowDrop(false)}
          onFocus={() => setShowDrop(true)}
        />
      </div>

      {(options.length > 0 && inputValue && showDrop) || hovering ? (
        <div 
          className="scrollbar-thin scrollbar-thumb-white scrollbar-track-[#11131d]/95 scrollbar-track-rounded-md scrollbar-thumb-rounded-full absolute w-full bg-[#11131d]/95 translate-y-2 z-10 rounded-md max-h-64 overflow-y-scroll"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {options.map((option, index) => (
            <div 
              className="p-2 hover:bg-[#1c1f2e] border-transparent border rounded-md hover:border-slate-400"
              onClick={() => {
                setChips([...chips, option]);
                setInputValue('');
                setHovering(false);
              }}
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FilterField;