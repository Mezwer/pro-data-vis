import React from "react";
import {
  LayoutGrid,
  StretchHorizontal,
  Grid3X3,
  Columns2,
  Columns3,
  Columns4,
} from "lucide-react";
import { Tooltip } from "react-tooltip";

const Arrangement = ({ layoutState, granularityState }) => {
  const { layout, setLayout } = layoutState;
  const { granularity, setGranularity } = granularityState;

  return (
    <div className="flex flex-row">
      <div className="flex flex-row gap-3 w-32 justify-end">
        <Columns2
          className={`hover:scale-125 transition-all active:scale-100 ${
            granularity === 0 ? "text-sky-500" : ""
          }`}
          onClick={() => setGranularity(0)}
          id="Columns2"
          data-tooltip-delay-show={500}
        />

        <Tooltip
          anchorSelect="#Columns2"
          place="bottom"
          className="!bg-slate-900 !text-xs !rounded-md z-10"
          content="X Axis is by year"
        />

        <Columns3
          className={`hover:scale-125 transition-all active:scale-100 ${
            granularity === 1 ? "text-sky-500" : ""
          }`}
          onClick={() => setGranularity(1)}
          id="Columns3"
          data-tooltip-delay-show={500}
        />
        <Tooltip
          anchorSelect="#Columns3"
          place="bottom"
          className="!bg-slate-900 !text-xs !rounded-md z-10"
          content="X Axis is by split"
        />

        <Columns4
          className={`hover:scale-125 transition-all active:scale-100 ${
            granularity === 2 ? "text-sky-500" : ""
          }`}
          onClick={() => setGranularity(2)}
          id="Columns4"
          data-tooltip-delay-show={500}
        />

        <Tooltip
          anchorSelect="#Columns4"
          place="bottom"
          className="!bg-slate-900 !text-xs !rounded-md z-10 outline-none"
          content="X Axis is by split, with playoffs separated"
        />
      </div>

      <div className="flex flex-row gap-3 mr-5 w-32 justify-end">
        <Grid3X3
          className={`hover:scale-125 transition-all active:scale-100 ${
            layout === 2 ? "text-sky-500" : ""
          }`}
          onClick={() => setLayout(2)}
        />
        <LayoutGrid
          className={`hover:scale-125 transition-all active:scale-100 ${
            layout === 1 ? "text-sky-500" : ""
          }`}
          onClick={() => setLayout(1)}
        />
        <StretchHorizontal
          className={`hover:scale-125 transition-all active:scale-100 ${
            layout === 0 ? "text-sky-500" : ""
          }`}
          onClick={() => setLayout(0)}
        />
      </div>
    </div>
  );
};

export default Arrangement;
