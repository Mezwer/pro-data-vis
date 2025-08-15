import React from 'react';

// mod is a modifier for the year ('24 -> 2024)
const CustomTooltip = ({ active, payload, data, mod }) => {
  if (!active || !payload || !payload.length) return;

  let val = payload[0].payload.Year ?? payload[0].payload.split;
  // if (mod == 0) {
  //   val = `20${val}`;
  // }

  return (
    <div className="p-4 bg-slate-950 flex flex-col gap-2 rounded-md">
      <p className="text-medium underline decoration-1">{val}</p>
      <p className="text-sm flex flex-col gap-1">
        {payload.length > 1 ? (
          <>
            {data}: {payload[1].value} ({payload[1].payload.gamesFiltered} games)
            <span>
              {data} (Unfiltered): {payload[0].value} ({payload[0].payload.games} games)
            </span>
          </>
        ) : (
          <>
            {data}: {payload[0].value} ({payload[0].payload.gamesFiltered} games)
          </>
        )}
      </p>
    </div>
  );
};

export default CustomTooltip;
