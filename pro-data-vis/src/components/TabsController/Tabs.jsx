import { useState } from 'react';
import { AppContext } from '@/contexts/StateProvider';
import { useContext } from 'react';

const Tabs = () => {
  const { activeView, setActiveView } = useContext(AppContext);

  return (
    <div className="absolute left-0 bottom-0 text-sm space-x-3 bg-black/40 px-3 py-2 rounded-xl ml-8">
      <span
        className={`text-gray-500 hover:text-white cursor-pointer transition-all duration-150 ${activeView === 0 ? '!text-white' : ''}`}
        onClick={() => setActiveView(0)}
      >
        Graphs
      </span>
      <span
        className={`text-gray-500 hover:text-white cursor-pointer transition-all duration-150 ${activeView === 1 ? '!text-white' : ''}`}
        onClick={() => setActiveView(1)}
      >
        Table
      </span>
    </div>
  );
};

export default Tabs;
