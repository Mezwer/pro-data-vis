import { useState } from 'react';

const FilterToggle = ({ label, filter, setFilter }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      
      setFilter(prev => ({...prev, [filter]: [newValue]}));
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      {label && <label className="text-sm font-medium text-white">{label}</label>}
      <button
        type="button"
        onClick={() => handleToggle()}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          isChecked 
            ? 'bg-blue-600' 
            : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        // disabled={disabled}
        aria-pressed={isChecked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isChecked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default FilterToggle;