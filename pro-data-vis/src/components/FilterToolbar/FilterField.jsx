import React, { useState, useEffect, useRef, useContext } from 'react';
import { mapping } from '@/constants/fields';
import { X } from 'lucide-react';
import FilterTypeControl from './FilterTypeControl';
import { filterTypeMap } from '@/constants/filters';
import { AppContext } from '@/contexts/StateProvider';

const FilterField = ({ choices, filter }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDrop, setShowDrop] = useState(true);
  const [options, setOptions] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [focus, setFocus] = useState(-1);
  const { filters, filterType, setFilterType, setFilters } = useContext(AppContext);

  const focusRef = useRef(null);
  const id = mapping[filter].replace(/\s/g, '');
  const chips = filters[filter] ?? [];

  useEffect(() => {
    if (focus >= 0 && focusRef.current) {
      focusRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [focus]);

  const setValues = (newVal) => {
    setFilters((prev) => ({ ...prev, [filter]: newVal }));
  };

  const handleKeyDown = (e) => {
    const trimmed = inputValue.trim();
    if (e.key === 'Enter' && ((trimmed && options.includes(trimmed)) || focus != -1)) {
      e.preventDefault();

      if (focus != -1 && !chips.includes(options[focus])) {
        setValues([...chips, options[focus]]);
        setInputValue('');
        setFocus(-1);
        return;
      }
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      setValues(chips.slice(0, -1));
      setFocus(-1);
    } else if (e.key === 'ArrowDown' && options.length > 0 && focus != options.length - 1) {
      setFocus(focus + 1);
    } else if (e.key === 'ArrowUp' && options.length > 0 && focus != 0) {
      setFocus(focus - 1);
    }
  };

  const removeChip = (chipToRemove) => {
    const newChips = chips.filter((chip) => chip !== chipToRemove);
    setValues(newChips);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredOptions = choices.filter((choice) => choice.toLowerCase().includes(value.toLowerCase()));
    setOptions(filteredOptions);

    setFocus(-1);
  };

  // TODO: eventually this will have to be more robust, as filters will have more types than just 0/1
  const setType = (filter) => {
    setFilterType((prev) => ({ ...prev, [filter]: prev[filter] ? 0 : 1 }));
  };

  return (
    <div className="relative flex-1">
      <div className="p-2 rounded-md flex flex-wrap gap-2 outline-none bg-[#1E202880] shadow-md focus-within:ring-[1px] focus-within:ring-white focus-within:shadow-slate-600">
        {chips.map((chip) => (
          <div key={chip} className="flex items-center gap-1 px-2 bg-neutral-200 text-black rounded-full text-sm">
            <span>{chip}</span>
            <button onClick={() => removeChip(chip)} className="hover:bg-neutral-300 rounded-full p-0.5 transition-all">
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          className="outline-none bg-transparent flex-1 h-full w-full"
          placeholder={chips.length === 0 ? `Enter a ${mapping[filter]}...` : ''}
          onBlur={() => {
            setShowDrop(false);
            setFocus(-1);
          }}
          onFocus={() => setShowDrop(true)}
        />

        {filterTypeMap?.[filter] && <FilterTypeControl filter={filter} types={filterType} setType={setType} id={id} />}
      </div>

      {(options.length > 0 && inputValue && showDrop) || hovering ? (
        <div
          className="scrollbar-thin scrollbar-thumb-white scrollbar-track-fore/95 scrollbar-track-rounded-md scrollbar-thumb-rounded-full absolute w-full bg-fore translate-y-2 z-10 rounded-md max-h-64 overflow-y-scroll"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {options.map((option, index) => (
            <div
              className={`p-2 border rounded-md ${index === focus ? 'border-slate-400 bg-fore/50' : 'border-transparent'}`}
              onClick={() => {
                setValues([...chips, option]);
                setInputValue('');
                setHovering(false);
              }}
              key={index}
              ref={focus == index ? focusRef : null}
              onMouseMove={() => setFocus(index)}
            >
              {option}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FilterField;
