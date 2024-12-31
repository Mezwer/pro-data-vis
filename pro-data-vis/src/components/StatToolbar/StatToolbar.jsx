import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import Arrangement from "../Arrangement/Arrangement";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const StatToolbar = ({ state, layoutState }) => {
  const { show, setShow } = state;
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <div className="flex justify-between flex-row items-center">
        <span className="text-2xl ml-10 underline flex flex-row items-center justify-center gap-1"> 
          Stats
          <ChevronDown 
            className={`relative -bottom-[3px] hover:scale-125 active:scale-100 transition-all ${collapse ? "rotate-180" : ""}`}
            onClick={() => {setCollapse(!collapse)}}
          /> 
        </span>
        <Arrangement layoutState={layoutState}/>
      </div>
      
      <div 
        className={`w-full mt-5 ml-20 flex gap-x-2 transition-all duration-500 ${collapse ? "absolute -translate-y-4 opacity-0 pointer-events-none" : ""}`}
      >
        {show.map((field) => (
          <Checkbox 
            label={field[0]} 
            key={field[0]} 
            state={field[2]} 
            setter={setShow} 
            index={field[1]}
          />
        ))}
      </div>
    </>
  );
};

export default StatToolbar;
