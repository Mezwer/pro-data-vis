import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts';
import { timeFields } from '@/constants/fields';

const DropTable = ({ row }) => {
  const fields = Object.keys(timeFields);
  const [target, setTarget] = useState('golddiff');
  const times = [10, 15, 20, 25];
  const data = times.map((time) => {
    const key = `${timeFields[target].displayName} @ ${time}`;
    return { time: time, value: row[key] };
  });

  return (
    <div className="row-drop-animate mx-8 w-full text-wrap">
      <span>
        {timeFields[target].displayName} @{' '}

      </span>
      <ResponsiveContainer height="80%" width="40%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />

          <XAxis dataKey="time" />
          <YAxis />
          <Line type="linear" dataKey="value" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DropTable;
