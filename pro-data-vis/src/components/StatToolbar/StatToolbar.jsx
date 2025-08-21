import Checkbox from '../Checkbox/Checkbox';
import Arrangement from './Arrangement';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const StatToolbar = ({ state }) => {
  const { show, setShow } = state;
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="mb-10">
      <div className="flex justify-between flex-row items-center">
        <span className="text-2xl ml-5 underline flex flex-row items-center justify-center gap-1">
          Stats
          <ChevronDown
            className={`relative -bottom-[3px] hover:scale-125 active:scale-100 transition-all duration-200 ease-linear ${collapse ? 'rotate-180' : ''}`}
            onClick={() => setCollapse(!collapse)}
          />
        </span>
        <Arrangement />
      </div>

      <div
        className={`w-11/12 mx-auto px-1 left-0 right-0 grid grid-cols-7 gap-y-[2px] transition-all duration-150 overflow-hidden ${collapse ? 'h-0' : 'h-48 mt-5'}`}
      >
        {show.map((field) => (
          <Checkbox label={field[0]} key={field[0]} state={field[2]} setter={setShow} index={field[1]} />
        ))}
      </div>
    </div>
  );
};

export default StatToolbar;
