import { Tooltip } from "react-tooltip";

const FilterSettingsToggle = ({ name, callback, value, description }) => {
  return (
    <>
      <button
        className="hover:scale-105 active:scale-95 transition-all duration-150 ease-linear"
        data-tooltip-id={name}
        data-tooltip-delay-show={500}
        onClick={() => callback()}
      >
        <div
          className={`rounded-md outline-1 bg-zinc-800/90 px-3 py-1 text-sm text-center ${value ? 'outline outline-sky-400 text-sky-400' : ''}`}
        >
          {name}
        </div>
      </button>
      <Tooltip 
        id={name}
        place="bottom"
        className="!bg-slate-900 !text-xs !rounded-md z-10 outline-none"
        content={description}
      />
    </>
  );
};

export default FilterSettingsToggle;
