import React, { useContext, useState } from 'react';
import { ChevronDown, RefreshCcw } from 'lucide-react';
import { filterToggle, filterField } from '@/constants/filters';
import { mapping } from '@/constants/fields';
import { Tooltip } from 'react-tooltip';
import { AppContext } from '@/contexts/StateProvider.jsx';
import FilterRange from './FilterRange';
import FilterField from './FilterField';
import FilterToggle from './FilterToggle';
import FilterSettingsToggle from './FilterSettingsToggle';

const FilterToolbar = ({ data, games, totalGames }) => {
  const [collapse, setCollapse] = useState(false);
  const [rotate, setRotate] = useState(1);
  const { maxTime } = data;
  const { split, setSplit, useAverages, setUseAverages, showGap, setShowGap, setFilters, setFilterType } =
    useContext(AppContext);

  const refreshFilters = () => {
    setRotate((prev) => prev + 1);
    setFilters((prev) => Object.fromEntries(Object.entries(prev).map(([key, _value]) => [key, []])));
    setFilterType((prev) => Object.fromEntries(Object.entries(prev).map(([key, value]) => [key, [value[0], 1]])));
  };

  return (
    <div className={`${collapse ? 'mb-2' : 'mb-5'} transition-all`}>
      <div className="flex justify-between flex-row items-center">
        <span className="text-2xl ml-5 underline flex flex-row items-center justify-center gap-1">
          Filters
          <ChevronDown
            className={`relative -bottom-[3px] hover:scale-125 active:scale-100 transition-all duration-200 ease-linear ${collapse ? 'rotate-180' : ''}`}
            onClick={() => setCollapse(!collapse)}
          />
        </span>

        <div className="flex flex-row gap-3 justify-center items-center">
          <button onClick={refreshFilters} className="p-1 transition-all duration-200 hover:scale-110 active:scale-95">
            <RefreshCcw
              className="text-white transition-transform duration-500 ease-in-out"
              style={{ transform: `rotate(-${rotate * 360}deg)` }}
            />
          </button>

          <FilterSettingsToggle
            name="Gap"
            callback={() => setShowGap((prev) => !prev)}
            value={showGap}
            description="Show/hide any points where the player has 0 games"
          />
          <FilterSettingsToggle
            name="Averages"
            callback={() => setUseAverages((prev) => !prev)}
            value={useAverages}
            description="Show the averages of every stat"
          />
          <FilterSettingsToggle
            name="Split View"
            callback={() => setSplit((prev) => (prev ? 0 : 1))}
            value={split}
            description="Compare filtered data (lighter) vs unfiltered data (darker)"
          />

          <span id="gamescounter" className="mr-5 text-lg ml-2" data-tooltip-delay-show={500}>
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
        className={`w-11/12 mx-auto px-1 left-0 right-0 flex flex-col gap-3 transition-all duration-150 ${collapse ? 'h-0 overflow-hidden' : 'h-32 pt-5'}`}
      >
        <div className="flex flex-row gap-5 flex-wrap">
          {filterField.map((filter) => (
            <FilterField choices={data[filter]} filter={filter} key={filter} />
          ))}
        </div>

        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-0 flex-1 min-w-[50lvw]">
            <FilterRange label={'Game Length'} filter="gamelength" maxTime={maxTime} />
          </div>

          <div className="flex-1 flex flex-row gap-3 items-end justify-end">
            {filterToggle.map((filter) => (
              <FilterToggle label={mapping[filter] || filter} filter={filter} key={filter} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
