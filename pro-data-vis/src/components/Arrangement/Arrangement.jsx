import React from "react";
import { LayoutGrid, StretchHorizontal, Grid3X3 } from "lucide-react";

const Arrangement = ({ layoutState }) => {
  const { layout, setLayout } = layoutState;

  return (
    <div className="flex flex-row gap-3 mr-5 w-32 justify-end">
      <Grid3X3
        className={`hover:scale-125 transition-all active:scale-100 ${
          layout == 2 ? "text-sky-500" : ""
        }`}
        onClick={() => setLayout(2)}
      />
      <LayoutGrid
        className={`hover:scale-125 transition-all active:scale-100 ${
          layout == 1 ? "text-sky-500" : ""
        }`}
        onClick={() => setLayout(1)}
      />
      <StretchHorizontal
        className={`hover:scale-125 transition-all active:scale-100 ${
          layout == 0 ? "text-sky-500" : ""
        }`}
        onClick={() => setLayout(0)}
      />
    </div>
  );
};

export default Arrangement;
