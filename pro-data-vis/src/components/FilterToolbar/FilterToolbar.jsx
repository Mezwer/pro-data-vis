import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FilterRange, FilterToggle, FilterField } from "..";
import { filterToggle } from '@/constants/filters';
import { mapping } from "@/constants/fields";

const FilterToolbar = ({ choices, setFilter }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="mb-10">
      <div className="flex justify-between flex-row items-center">
        <span className="text-2xl ml-10 underline flex flex-row items-center justify-center gap-1"> 
          Filters
          <ChevronDown 
            className={`relative -bottom-[3px] hover:scale-125 active:scale-100 transition-all duration-200 ease-linear ${collapse ? "rotate-180" : ""}`}
            onClick={() => {setCollapse(!collapse)}}
          /> 
        </span>
      </div>
      
      <div className={`w-11/12 mt-5 mx-auto left-0 right-0 flex flex-col gap-3 transition-all duration-150 ${collapse ? "-translate-y-4 opacity-0 pointer-events-none absolute" : ""}`}>
        <div className="flex flex-row gap-5 flex-wrap">
          {
            Object.keys(choices).map(filter => (
              <FilterField choices={choices[filter]} filter={filter} setFilter={setFilter} key={filter}/>
            ))
          }
        </div>
        
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-0 flex-1">
            <FilterRange filter={"Game Length"}/>
            <FilterRange filter={"Game Length"}/>
          </div>

          <div className="flex-1">
            {
              filterToggle.map(filter => (
                <FilterToggle label={mapping[filter]} filter={filter} setFilter={setFilter} key={filter} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
