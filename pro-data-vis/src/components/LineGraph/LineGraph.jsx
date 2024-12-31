import React from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import CustomTooltip from "../Tooltip/CustomTooltip.jsx";


const LineGraph = ({ color, data, ydata }) => {
  // Create a unique ID for each gradient using the color value
  const gradientId = `gradient-${color}`;

  return (
    <ResponsiveContainer height="50%" width="80%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={1} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="1 8" opacity={0.5}/>
        <Area 
          dataKey={ydata}
          type="monotone"
          fillOpacity={1}
          strokeOpacity={0.5}
          stroke={color}
          fill={`url(#${gradientId})`}
        />
        
        <XAxis dataKey={"Year"}>
          <Label value={"Year"} offset={-5} position="insideBottom"/>
        </XAxis>
        <YAxis>
          <Label value={ydata} offset={0} position="insideLeft" angle={-90}/>
        </YAxis>
        <Tooltip content={<CustomTooltip data={ydata}/>}/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;