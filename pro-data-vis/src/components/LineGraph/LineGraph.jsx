import React from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import CustomTooltip from "../Tooltip/CustomTooltip.jsx";

const specialStatNames = {
  "cs": "CS",
};

const LineGraph = ({ color, data, ydata }) => {
  let formatted;
  if (ydata in specialStatNames)
    formatted = specialStatNames[ydata];
  else
    formatted = ydata[0].toUpperCase() + ydata.slice(1);

  return (
    <ResponsiveContainer height="50%" width="80%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#color)"
        />
        
        <XAxis dataKey={"year"}>
          <Label value={"Year"} offset={0} position="insideBottom"/>
        </XAxis>
        <YAxis>
          <Label value={formatted} offset={0} position="insideLeft" angle={-90}/>
        </YAxis>
        <Tooltip content={<CustomTooltip data={formatted}/>}/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;