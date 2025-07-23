import React from "react";
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";
import CustomTooltip from "../Tooltip/CustomTooltip.jsx";
import { chartConfigs } from "@/constants/fields.js";
import { CustomXAxisTick } from "@/components";

/**
 * Component for a graph depicting player data
 * Used for a single stat (i.e kills/year or deaths/year)
 *
 * @param {Object} props
 * @param {string} props.color - color of graph
 * @param {Object[]} props.data - data for graph
 * @param {string} props.ydata - key for what the y-axis data is
 * @returns {React.JSX.Element}
 */
const LineGraph = ({ color, data, ydata }) => {
  // Create a unique ID for each gradient using the color value
  const gradientId = `gradient${color}`;
  const gradientConfig = chartConfigs[color];
  const key = data?.[0]?.Year ? "Year" : "split";

  const roundNumber = (num) => {
    if (num < 10) return +num.toFixed(2);
    if (num >= 100) return Math.round(num);
    return +num.toFixed(1);
  };

  return (
    <ResponsiveContainer height="90%" width="95%">
      <AreaChart data={data} overflow={'visible'}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            {gradientConfig["stops"].map((item) => (
              <stop
                key={item["color"]}
                offset={item["offset"]}
                stopColor={item["color"]}
                stopOpacity={item["opacity"]}
              />
            ))}
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#374151"
          strokeOpacity={0.3}
        />
        <Area
          dataKey={ydata}
          type="monotone"
          // fillOpacity={0.4}
          strokeOpacity={1}
          stroke={gradientConfig["stroke"]}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
        />

        <XAxis 
          dataKey={key} 
          tick={(<CustomXAxisTick />)} 
          interval={0}
          height={key === "Year" ? 30 : 50}
        />
        <YAxis
          domain={[
            // TODO: this is a patchwork fix. find out why there is -infinity somewhere here
            (dataMin) => isFinite(dataMin) ? dataMin - dataMin * 0.1 : 0,
            (dataMax) => dataMax + dataMax * 0.1,
          ]}
          tick={{ fontSize: ".8rem" }}
          tickFormatter={roundNumber}
          width={35}
        >
          {/* <Label value={yDataName} offset={12} position="insideLeft" angle={-90}/> */}
        </YAxis>
        <Tooltip content={<CustomTooltip data={ydata} mod={0} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
