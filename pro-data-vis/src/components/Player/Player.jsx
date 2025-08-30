'use client';
import StatToolbar from '../StatToolbar/StatToolbar';
import FilterToolbar from '../FilterToolbar/FilterToolbar';
import GraphIcon from './GraphIcon';
import NullFieldAlert from './NullFieldAlert';
import { players } from '@/constants/players';
import React, { useState, useEffect, useContext } from 'react';
import { fields, averages, chartConfigs, fieldsInfo } from '@/constants/fields.js';
import { filterSelectionTemp } from '@/constants/filters.js';
import { AppContext } from '@/contexts/StateProvider';
import dynamic from 'next/dynamic';

const LineGraph = dynamic(() => import('../LineGraph/LineGraph'), { ssr: false });

/**
 * Renders the page of a player, with all graphs and data
 *
 * @param {Object} props
 * @param {string} props.playername - name of player
 * @param {Object[]} props.graphData - data for the player
 * @param {Object} props.staticData - static data for the page, such as champion names
 * @returns {React.JSX.Element}
 */
const Player = ({ playername, graphData, staticData }) => {
  // show which items
  const [show, setShow] = useState(
    fields.map((field, index) =>
      // maybe later make this an object to better readability
      [field, index, ['kills', 'deaths', 'assists', 'result'].includes(field), field]
    )
  );

  const [filteredData, setFilteredData] = useState({});
  const { layout, granularity, useAverages, filterType, filters } = useContext(AppContext);

  const chartConfigLen = chartConfigs.length;
  const playerObj = players.find((item) => item.player === playername);

  // update filtered data whenever filters are updated
  useEffect(() => {
    setFilteredData(filterData(graphData));
  }, [filters, filterType]);

  // change what graphs are shown using the index in the state
  const changeShow = (index) => {
    const newShow = [...show];
    newShow[index][2] = !newShow[index][2];

    setShow(newShow);
  };

  const filterData = (data) => {
    const newData = {};
    for (const [year, yrData] of Object.entries(data)) {
      const row = [];

      yrData.forEach((item) => {
        if (checkRow(item)) row.push(item);
      });

      newData[year] = row;
    }

    return newData;
  };

  const filterDataLeague = (data) => {
    const newData = {};
    for (const [year, yrData] of Object.entries(data)) {
      const row = [];
      yrData.forEach((item) => {
        if (filters['league'].includes(item.league)) row.push(item);
      });
      newData[year] = row;
    }

    return newData;
  };

  const checkRow = (row) => {
    for (const [key, filter] of Object.entries(filters)) {
      if (filter.length === 0) continue;

      const name = key;
      // console.log(filterType[filter], filter);
      if (!filterSelectionTemp[name](row, filter, name, filterType[name])) return false;
    }

    return true;
  };

  const getColData = (item, data, avg) => {
    const newData = [];
    for (const [year, yrData] of Object.entries(data)) {
      let sum = 0;
      let count = 0;
      yrData.forEach((row) => {
        if (row[item] !== null) {
          sum += row[item];
          count += 1;
        }
      });

      const number = avg || useAverages ? Number((sum / count).toFixed(2)) : sum;
      newData.push({ Year: year, [item]: number || 0, games: count });
    }

    return newData;
  };

  // for more granular data aka instead of x axis being years, its now by split
  const getColSplitData = (item, data, avg, includePlayoff = false) => {
    const newData = [];
    for (const [yr, yrData] of Object.entries(data)) {
      const splitSums = {};

      for (const { split, [item]: value, league, playoffs } of yrData) {
        let key = split ? `${league} ${split}` : league; // for use in graph display
        if (playoffs && includePlayoff) key += ' Playoffs';

        if (!splitSums[key]) {
          splitSums[key] = { total: 0, count: 0 };
        }

        splitSums[key].total += value ?? 0;
        splitSums[key].count += 1;
      }

      for (const [split, stats] of Object.entries(splitSums)) {
        newData.push({
          split: `${yr} ${split}`,
          [item]: avg || useAverages ? Number((stats.total / stats.count).toFixed(2)) : stats.total,
          games: stats.count,
        });
      }
    }

    return newData;
  };

  const chooseGranularity = (item, data, avg) => {
    switch (granularity) {
      case 0:
        return getColData(item, data, avg);
      case 1:
        return getColSplitData(item, data, avg, false);
      case 2:
        return getColSplitData(item, data, avg, true);
      default:
        return getColData(item, data, avg);
    }
  };

  const getNumGames = (games) => {
    return Object.values(games).reduce((sum, arr) => sum + arr.length, 0);
  };

  let arrange = '';
  if (layout == 1) arrange = 'grid grid-cols-3';
  else if (layout == 2) arrange = 'grid grid-cols-5';

  return (
    <div className="">
      <div className="bg-black/40 py-5 mx-6 my-5 rounded-md border border-gray-800 border-1">
        <StatToolbar state={{ show: show, setShow: changeShow }} />
        <FilterToolbar data={staticData} games={getNumGames(filteredData)} totalGames={getNumGames(graphData)} />
      </div>

      <div className={`${arrange} place-items-center mx-6 gap-4`}>
        {show.map((item, index) =>
          item[2] ? (
            <div
              className={`w-[100%] mx-auto flex flex-col gap-6 items-center justify-center bg-black/40 rounded-lg mb-10 ${layout == 2 ? 'h-[20rem]' : 'h-[30rem]'}`}
              key={item[0]}
            >
              <span className="mt-3 mx-auto flex flex-row gap-2 items-center relative w-[94%] justify-center">
                <GraphIcon name={item[0]} color={index % (chartConfigLen - 1)} />
                {fieldsInfo[item[0]].name}
                {playerObj.leagues.includes('LPL') && fieldsInfo[item[0]].isNullField && (
                  <NullFieldAlert field={item[0]} />
                )}
              </span>
              <LineGraph
                color={index % (chartConfigLen - 1)}
                data={chooseGranularity(item[0], filteredData, averages.has(item[3]))}
                // currently filtering in the Player component, but i think if the animations are a
                // something i want back it's possible to move some of the filtering to the graph component
                originalData={chooseGranularity(
                  item[0],
                  filters['league'].length > 0 ? filterDataLeague(graphData) : graphData,
                  averages.has(item[3])
                )}
                ydata={item[0]}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Player;
