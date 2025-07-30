import React, { useContext } from 'react';
import { LayoutGrid, StretchHorizontal, Grid3X3, Columns2, Columns3, Columns4 } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { AppContext } from '@/contexts/StateProvider';

const Arrangement = () => {
  const { layout, setLayout, granularity, setGranularity } = useContext(AppContext);

  return (
    <div className="flex flex-row">
      <div className="flex flex-row gap-3 w-32 justify-end">
        <button
          onClick={() => setGranularity(0)}
          data-tooltip-id="Columns2"
          data-tooltip-delay-show={500}
          className="hover:scale-125 transition-all active:scale-100 outline-none"
        >
          <Columns2 className={`${granularity === 0 ? 'text-sky-500' : ''}`} />
        </button>
        <Tooltip
          id="Columns2"
          place="bottom"
          className="!bg-slate-900 !text-xs !rounded-md z-10 outline-none"
          content="X Axis is by year"
        />

        <button
          onClick={() => setGranularity(1)}
          data-tooltip-id="Columns3"
          data-tooltip-delay-show={500}
          className="hover:scale-125 transition-all active:scale-100 outline-none"
        >
          <Columns3 className={`${granularity === 1 ? 'text-sky-500' : ''}`} />
        </button>
        <Tooltip
          id="Columns3"
          place="bottom"
          className="!bg-slate-900 !text-xs !rounded-md z-10"
          content="X Axis is by split"
        />

        <button
          onClick={() => setGranularity(2)}
          data-tooltip-id="Columns4"
          data-tooltip-delay-show={500}
          className="hover:scale-125 transition-all active:scale-100 outline-none"
        >
          <Columns4 className={`${granularity === 2 ? 'text-sky-500' : ''}`} />
        </button>
        <Tooltip
          id="Columns4"
          place="bottom"
          className="!bg-slate-900 !text-xs !rounded-md z-10 outline-none"
          content="X Axis is by split, with playoffs separated"
        />
      </div>

      <div className="flex flex-row gap-3 mr-5 w-32 justify-end">
        <button
          onClick={() => setLayout(2)}
          className="hover:scale-125 transition-all active:scale-100 outline-none"
        >
          <Grid3X3 className={`${layout === 2 ? 'text-sky-500' : ''}`} />
        </button>
        <button
          onClick={() => setLayout(1)}
          className="hover:scale-125 transition-all active:scale-100 outline-none"
        >
          <LayoutGrid className={`${layout === 1 ? 'text-sky-500' : ''}`} />
        </button>
        <button
          onClick={() => setLayout(0)}
          className="hover:scale-125 transition-all active:scale-100 outline-none"
        >
          <StretchHorizontal className={`${layout === 0 ? 'text-sky-500' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default Arrangement;
