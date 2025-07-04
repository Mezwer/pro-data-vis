import React from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import CustomTooltip from "../Tooltip/CustomTooltip.jsx";
import { chartConfigs } from "@/constants/fields.js";

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

  return (
    <ResponsiveContainer height="100%" width="95%">
      <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              {
                gradientConfig['stops'].map((item) => (
                  <stop 
                    key={item['color']} 
                    offset={item['offset']} 
                    stopColor={item['color']} 
                    stopOpacity={item['opacity']}
                  />
                ))
              }
            </linearGradient>
          </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
        <Area 
          dataKey={ydata}
          type="monotone"
          // fillOpacity={0.4}
          strokeOpacity={1}
          stroke={gradientConfig['stroke']}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
        />
        
        <XAxis 
          dataKey={"Year"} 
          tick={{fontSize: ".8rem"}}
        />
        <YAxis 
          domain={[(dataMin) => dataMin - dataMin * 0.1, (dataMax) => dataMax + dataMax * 0.1]}
          tick={{fontSize: ".8rem"}}
          width={40}
        >
          {/* <Label value={yDataName} offset={12} position="insideLeft" angle={-90}/> */}
        </YAxis>
        <Tooltip content={<CustomTooltip data={ydata} mod={0}/>}/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;