import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import Arrangement from "../Arrangement/Arrangement";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const StatToolbar = ({ state, layoutState }) => {
  const { show, setShow } = state;
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="mb-10">
      <div className="flex justify-between flex-row items-center">
        <span className="text-2xl ml-10 underline flex flex-row items-center justify-center gap-1">
          Stats
          <ChevronDown
            className={`relative -bottom-[3px] hover:scale-125 active:scale-100 transition-all duration-200 ease-linear ${
              collapse ? "rotate-180" : ""
            }`}
            onClick={() => {
              setCollapse(!collapse);
            }}
          />
        </span>
        <Arrangement layoutState={layoutState} />
      </div>

      <div
        className={`w-11/12 mt-5 mx-auto grid grid-cols-7 transition-all duration-150 ${
          collapse
            ? "absolute -translate-y-4 opacity-0 pointer-events-none"
            : ""
        }`}
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
    </div>
  );
};

export default StatToolbar;
