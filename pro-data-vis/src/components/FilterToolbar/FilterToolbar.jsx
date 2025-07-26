import React, { useState } from 'react';
import { ChevronDown, SquareSplitVertical } from 'lucide-react';
import FilterRange from '../FilterRange/FilterRange';
import FilterField from '../FilterField/FilterField';
import FilterToggle from '../FilterToggle/FilterToggle';
import { filterToggle } from '@/constants/filters';
import { mapping } from '@/constants/fields';
import { Tooltip } from 'react-tooltip';

const FilterToolbar = ({
  choices,
  setFilter,
  types,
  setTypes,
  split,
  setSplit,
  games,
  totalGames,
}) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="mb-10">
      <div className="flex justify-between flex-row items-center">
        <span className="text-2xl ml-10 underline flex flex-row items-center justify-center gap-1">
          Filters
          <ChevronDown
            className={`relative -bottom-[3px] hover:scale-125 active:scale-100 transition-all duration-200 ease-linear ${
              collapse ? 'rotate-180' : ''
            }`}
            onClick={() => setCollapse(!collapse)}
          />
        </span>

        <div className="flex flex-row gap-3 justify-center items-center">
          <SquareSplitVertical
            size={23}
            className={`hover:scale-125 active:scale-100 transition-all duration-200 ease-linear ${
              split ? 'text-sky-500' : ''
            }`}
            onClick={() => setSplit((prev) => (prev ? 0 : 1))}
          />

          <span id="gamescounter" className="mr-5 text-lg">
            Games: {games} / {totalGames}
          </span>
          <Tooltip
            anchorSelect="#gamescounter"
            place="bottom"
            content={'Number of games given the current filters'}
            opacity={1}
            className="!bg-slate-900 !text-xs !rounded-md z-10"
          />
        </div>
      </div>

      <div
        className={`w-11/12 mt-5 mx-auto left-0 right-0 flex flex-col gap-3 transition-all duration-150 ${
          collapse ? '-translate-y-4 opacity-0 pointer-events-none absolute' : ''
        }`}
      >
        <div className="flex flex-row gap-5 flex-wrap">
          {Object.keys(choices).map((filter) => (
            <FilterField
              choices={choices[filter]}
              filter={filter}
              setFilter={setFilter}
              types={types}
              setTypes={setTypes}
              key={filter}
            />
          ))}
        </div>

        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-0 flex-1 min-w-[50lvw]">
            <FilterRange label={'Game Length'} setFilter={setFilter} filter="gamelength" />
            {/* <FilterRange label={"Game Length"} setFilter={setFilter}/> */}
          </div>

          <div className="flex-1 flex flex-row gap-7 justify-start align-top mb-auto flex-wrap">
            {filterToggle.map((filter) => (
              <FilterToggle
                label={mapping[filter] || filter}
                filter={filter}
                setFilter={setFilter}
                key={filter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
