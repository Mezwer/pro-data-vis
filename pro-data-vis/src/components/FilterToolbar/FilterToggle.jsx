import { useState, useContext } from 'react';
import { AppContext } from '@/contexts/StateProvider';

const FilterToggle = ({ label, filter }) => {
  // const [isChecked, setIsChecked] = useState(false);

  const { filters, setFilters } = useContext(AppContext);
  const special = {
    Loss: [0, 'result'],
    Win: [1, 'result'],
    Blue: ['Blue', 'side'],
    Red: ['Red', 'side'],
  };

  const checkIsChecked = () => {
    if (!Object.keys(special).includes(label)) {
      return filters[filter][0] ?? false;
    }

    const category = special[label][1];
    const target = special[label][0];

    return filters[category].includes(target);
  };
  const isChecked = checkIsChecked();

  const handleToggle = () => {
    const newValue = !isChecked;

    if (!Object.keys(special).includes(label)) setFilters((prev) => ({ ...prev, [filter]: [newValue] }));
    else {
      // special architecture for win/loss, blue/red because of the field
      setFilters((prev) => {
        const val = special[label][0];
        const category = special[label][1];

        const newVals = newValue ? [...prev[category], val] : [...prev[category]].filter((value) => value !== val);

        return { ...prev, [category]: newVals };
      });
    }
  };

  return (
    <button
      className="hover:scale-105 active:scale-95 transition-all duration-150 ease-linear"
      onClick={handleToggle}
      aria-pressed={isChecked}
    >
      <div
        className={`rounded-xl outline-1 bg-slate-800/90 px-4 py-1 text-sm text-center ${isChecked ? 'outline outline-green-400 text-green-400' : ''}`}
      >
        {label}
      </div>
    </button>
  );
};

export default FilterToggle;
