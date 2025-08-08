'use client';
import { React, useContext } from 'react';
import { Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import CustomTooltip from '../Tooltip/CustomTooltip.jsx';
import CustomXAxisTick from '../CustomXAxisTick/CustomXAxisTick.jsx';
import { chartConfigs } from '@/constants/fields.js';
import { AppContext } from '@/contexts/StateProvider';

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
const LineGraph = ({ color, data, originalData, ydata }) => {
  // Create a unique ID for each gradient using the color value
  const gradientId = `gradient${color}`;
  const gradientConfig = chartConfigs[color];
  const key = data?.[0]?.Year ? 'Year' : 'split';

  const { split, showGap } = useContext(AppContext);

  const roundNumber = (num) => {
    if (num < 10) return +num.toFixed(2);
    if (num >= 100) return Math.round(num);
    return +num.toFixed(1);
  };

  const mergeData = () => {
    // console.log(data)
    const first = showGap ? originalData : data;
    const second = showGap ? data : originalData;

    const merged = first.map(item => {
      const filtered = second.find(secondItem => secondItem[key] === item[key]);

      return {
        [key]: item[key],
        series1: showGap ? item[ydata] : filtered[ydata],
        series2: showGap ? filtered?.[ydata] ?? 0 : item[ydata],
        games: showGap ? item.games : filtered.games,
        gamesFiltered: showGap ? filtered?.games ?? 0 : item.games,
      }
    })
    
    return merged;
  };

  const mergedData = mergeData();

  return (
    <ResponsiveContainer height="90%" width="95%">
      <AreaChart data={mergedData} overflow={'visible'}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            {gradientConfig['stops'].map((item) => (
              <stop
                key={item['color']}
                offset={item['offset']}
                stopColor={item['color']}
                stopOpacity={item['opacity']}
              />
            ))}
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />

        {split && (
          <Area
            dataKey={'series1'}
            type="monotone"
            fillOpacity={0.3}
            strokeOpacity={0.3}
            stroke={gradientConfig['stroke']}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
          />
        )}

        <Area
          dataKey={'series2'}
          type="monotone"
          strokeOpacity={1}
          stroke={gradientConfig['stroke']}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
        />

        <XAxis dataKey={key} tick={<CustomXAxisTick />} interval={0} height={key === 'Year' ? 30 : 55} />
        <YAxis
          domain={[
            // TODO: this is a patchwork fix. find out why there is -infinity somewhere here
            (dataMin) => (isFinite(dataMin) ? dataMin - (dataMin * (dataMin >= 0 ? .1 : -.1)) : 0),
            (dataMax) => dataMax + dataMax * 0.1,
          ]}
          tick={{ fontSize: '.8rem' }}
          tickFormatter={roundNumber}
          width={35}
        >
          {/* <Label value={yDataName} offset={12} position="insideLeft" angle={-90}/> */}
        </YAxis>
        <Tooltip content={<CustomTooltip data={ydata} mod={0} />} />
        <ReferenceLine y={0} strokeWidth={1} stroke="#374151"/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
