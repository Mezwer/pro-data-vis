import React from "react";

const CustomTooltip = ({ active, payload, label, data }) => {
  if (!active || !payload || !payload.length)
    return;

  return (
    <div className="p-4 bg-slate-950 flex flex-col gap-2 rounded-md">
      <p className="text-medium underline decoration-1">{label}</p>
      <p className="text-sm">
        {data}: {payload[0].value}
      </p>
    </div>
  );
};

export default CustomTooltip;