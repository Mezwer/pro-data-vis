import { useState } from "react";

const FilterToggle = ({ label, filter, setFilter }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);

      const special = {
        Loss: [0, "result"],
        Win: [1, "result"],
        Blue: ["Blue", "side"],
        Red: ["Red", "side"],
      };

      if (!Object.keys(special).includes(label))
        setFilter((prev) => ({ ...prev, [filter]: [newValue] }));
      else {
        // special architecture for win/loss, blue/red because of the field
        setFilter((prev) => {
          const val = special[label][0];
          const category = special[label][1];

          const newVals = newValue
            ? [...prev[category], val]
            : [...prev[category]].filter((value) => value !== val);

          return { ...prev, [category]: newVals };
        });
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {label && (
        <label className="text-sm font-medium text-gray-200">{label}</label>
      )}
      <button
        type="button"
        onClick={() => handleToggle()}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isChecked ? "bg-blue-700" : "bg-gray-700"
        }`}
        aria-pressed={isChecked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
            isChecked ? "translate-x-6 bg-white" : "translate-x-1 bg-gray-300"
          }`}
        />
      </button>
    </div>
  );
};

export default FilterToggle;
