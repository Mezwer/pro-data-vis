import React from "react";
import { LayoutGrid, StretchHorizontal } from "lucide-react";

const Arrangement = ({ layoutState }) => {
  const { layout, setLayout } = layoutState;

  return (
    <div className="flex w-10 flex-row gap-4 mr-5 w-20">
      <LayoutGrid 
        className={`hover:scale-125 transition-all active:scale-100 ${layout == 1 ? "text-sky-500" : ""}`}
        onClick={() => setLayout(1)}
      />
      <StretchHorizontal 
        className={`hover:scale-125 transition-all active:scale-100 ${layout == 0 ? "text-sky-500" : ""}`}
        onClick={() => setLayout(0)}
      />
    </div>
  );
};

export default Arrangement;