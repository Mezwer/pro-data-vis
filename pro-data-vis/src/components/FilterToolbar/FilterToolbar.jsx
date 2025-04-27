import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import FilterField from "../FilterField/FilterField";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FilterToolbar = ({ choices, setFilter}) => {
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
      
      <div className="w-11/12 mt-5 mx-auto flex gap-10">
        {
          Object.keys(choices).map(filter => (
            <FilterField choices={choices[filter]} filter={filter} setFilter={setFilter} key={filter}/>
          ))
        }
      </div>
    </div>
  );
};

export default FilterToolbar;
