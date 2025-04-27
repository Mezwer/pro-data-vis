import React, { useState, useEffect, useRef } from "react";
import { mapping } from "@/constants/fields";
import { X } from 'lucide-react';

const FilterField = ({ choices, filter, setFilter }) => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showDrop, setShowDrop] = useState(true);
  const [options, setOptions] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [focus, setFocus] = useState(-1);

  const focusRef = useRef(null);

  useEffect(() => {
    if (focus >= 0 && focusRef.current) {
      focusRef.current.scrollIntoView({
        block: "nearest"
      });
    }
  }, [focus]);

  const setValues = (newVal) => {
    setChips(newVal);
    setFilter(prev => ({...prev, [filter]: newVal}));
  }

  const handleKeyDown = (e) => {
    const trimmed = inputValue.trim();
    if (e.key === 'Enter' && ((trimmed && options.includes(trimmed)) || focus != -1)) {
      e.preventDefault();

      if (focus != -1) {
        setValues([...chips, options[focus]])
        setInputValue('');
        setFocus(-1);
        return;
      }

      if (!chips.includes(trimmed)) {
        setValues([...chips, trimmed]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      setValues(chips.slice(0, -1));
      setFocus(-1);
    } else if (e.key === 'ArrowDown' && options.length > 0) {
      if (focus != options.length - 1)
        setFocus(focus + 1);
    } else if (e.key === 'ArrowUp' && options.length > 0) {
      if (focus != 0)
        setFocus(focus - 1);
    }
  };

  const removeChip = (chipToRemove) => {
    const newChips = chips.filter(chip => chip !== chipToRemove);
    setValues(newChips);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const filteredOptions = choices.filter(choice => choice.toLowerCase().includes(value.toLowerCase()));
    setOptions(filteredOptions);

    setFocus(-1);
  }

  return (
    <div className="relative flex-1">
      <div className="p-2 rounded-md flex flex-wrap gap-2 outline-none bg-[#1E202880] focus-within:ring-[1px] focus-within:ring-white">
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
          placeholder={chips.length === 0 ? `Enter a ${mapping[filter]}...` : ""}
          onBlur={() => {
            setShowDrop(false);
            setFocus(-1);
          }}
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
              className={`p-2 border rounded-md hover:border-slate-400 hover:bg-[#1c1f2e] ${index === focus ? "border-slate-400 bg-[#1c1f2e]" : "border-transparent"}`}
              onClick={() => {
                setValues([...chips, option]);
                setInputValue('');
                setHovering(false);
              }}
              key={index}
              ref={focus == index ? focusRef : null}
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