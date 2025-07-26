'use client';
import React from 'react';
import { LineGraph, StatToolbar, NamePlate, Spinner, FilterToolbar } from '@/components';
import { useState, useEffect } from 'react';
import { fields, mapping, averages, chartConfigs } from '@/constants/fields.js';
import { filterSelection, filterSelectionTemp } from '@/constants/filters';

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
      [mapping[field], index, ['kills', 'deaths', 'assists', 'result'].includes(field), field]
    )
  );

  const [filters, setFilters] = useState(
    Object.fromEntries(filterSelection.map((filter) => [filter, []]))
  );

  const [filterType, setFilterType] = useState(
    Object.fromEntries(Object.keys(filterSelectionTemp).map((filter) => [filter, 1]))
  );

  // layout of graphs: 0 = vertical, 1 = compact, 2 = more compact
  const [layout, setLayout] = useState(1);
  // how fine the data is: 0 = by year, 1 = by split, 2 = by split, separate playoffs
  const [granularity, setGranularity] = useState(0);
  // 1 = split, 0 = no split
  const [split, setSplit] = useState(0);

  const [filteredData, setFilteredData] = useState([]);

  const chartConfigLen = chartConfigs.length;

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

      const number = avg ? Number((sum / count).toFixed(2)) : sum;
      newData.push({ Year: year, [item]: number || 0 });
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
          [item]: avg ? Number((stats.total / stats.count).toFixed(2)) : stats.total,
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
  else if (layout == 2) arrange = 'grid grid-cols-4';

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #06101c 0%, #030712 25%, #010408 50%, #030712 75%, #06101c 100%)',
      }}
      // className="bg-[#030712]"
    >
      <NamePlate name={playername} />
      <StatToolbar
        state={{ show: show, setShow: changeShow }}
        layoutState={{ layout: layout, setLayout: setLayout }}
        granularityState={{
          granularity: granularity,
          setGranularity: setGranularity,
        }}
      />
      <FilterToolbar
        choices={staticData}
        setFilter={setFilters}
        setTypes={setFilterType}
        types={filterType}
        setSplit={setSplit}
        split={split}
        games={getNumGames(filteredData)}
        totalGames={getNumGames(graphData)}
      />

      <div className={`${arrange} place-items-center`}>
        {show.map((item, index) =>
          item[2] ? (
            <div
              className="h-[30rem] w-[96%] mx-auto flex flex-col gap-6 items-center justify-center border-solid border-zinc-800 bg-zinc-800/40 border-2 rounded-lg mb-10"
              key={item[0]}
            >
              <span className="mt-3"> {item[0]} </span>
              <LineGraph
                color={index % (chartConfigLen - 1)}
                data={chooseGranularity(item[0], filteredData, averages.has(item[3]))}
                originalData={chooseGranularity(item[0], graphData, averages.has(item[3]))}
                ydata={item[0]}
                split={split}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Player;
