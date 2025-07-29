import { filterTypeMap } from '@/constants/filters';
import { Tooltip } from 'react-tooltip';

const FilterTypeControl = ({ filter, types, setType, id }) => {
  const Icon = filterTypeMap[filter].icon;

  return (
    <>
      <button
        onClick={() => setType(filter)}
        className="outline-none transform transition duration-150 ease-in-out hover:scale-110 active:scale-95"
        id={id}
        data-tooltip-delay-show={500}
      >
        <Icon color={types[filter] ? '#4ade80' : '#A3A3A3'} focusable="false" aria-hidden="true" />
      </button>
      <Tooltip
        anchorSelect={`#${id}`}
        place="top"
        className="!bg-slate-900 !text-xs !rounded-md z-10"
        opacity={1}
        content={filterTypeMap[filter].description}
      />
    </>
  );
};

export default FilterTypeControl;
