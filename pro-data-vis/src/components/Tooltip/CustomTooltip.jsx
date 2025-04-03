import React from "react";

// mod is a modifier for the year ('24 -> 2024)
const CustomTooltip = ({ active, payload, data, mod }) => {
  if (!active || !payload || !payload.length)
    return;

  let val = payload[0].payload.Year;
  if (mod == 0) {
    val = `20${val}`;
  }

  return (
    <div className="p-4 bg-slate-950 flex flex-col gap-2 rounded-md">
      <p className="text-medium underline decoration-1">{val}</p>
      <p className="text-sm">
        {data}: {payload[0].value}
      </p>
    </div>
  );
};

export default CustomTooltip;