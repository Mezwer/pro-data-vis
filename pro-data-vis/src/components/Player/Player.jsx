"use client";
import React from "react";
import { LineGraph, StatToolbar, NamePlate, Spinner, FilterToolbar } from "@/components";
import { useState, useEffect } from "react";
import { fields, colors, mapping, averages } from "@/constants/fields.js";
import { filterSelection, filterSelectionTemp } from "@/constants/filters";

/**
 * Renders the page of a player, with all graphs and data
 * 
 * @param {Object} props 
 * @param {string} props.playername - name of player
 * @param {Object[]} props.graphData - data for the player
 * @param {string[]} props.champions - list of champions in league
 * @returns {React.JSX.Element}
 */
const Player = ({ playername, graphData, staticData }) => {
  // show which items
  const [show, setShow] = useState(fields.map(((field, index) => 
    [
      mapping[field], 
      index, 
      ["kills", "deaths", "assists", "result"].includes(field),
      field,
    ]
  )));

  const [filters, setFilters] = useState(
    Object.fromEntries(
      filterSelection.map(filter => [filter, []])
    )
  );

  // console.log(graphData);
  // layout of graphs: 0 = vertical, 1 = compact, 2 = more compact
  const [layout, setLayout] = useState(1);

  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  // update filtered data whenever filters are updated
  useEffect(() => {
    const newData = filterData(graphData);
    setFilteredData(newData);
    setLoading(false);
  }, [filters]);

  // change what graphs are shown using the index in the state
  const changeShow = (index) => {
    const newShow = [...show];
    newShow[index][2] = !newShow[index][2];

    setShow(newShow);
  };

  const filterData = (data) => {
    const start = performance.now();

    const newData = {};
    for (const [year, yrData] of Object.entries(data)) {
      const row = [];

      yrData.forEach(item => {
        if (checkRow(item))
          row.push(item);
      });

      newData[year] = row;
    }

    const end = performance.now();
    return newData;
  }

  const checkRow = (row) => {
    for (const [key, filter] of Object.entries(filters)) {
      if (filter.length === 0) continue;

      const name = key;
      // TODO: make bans "or", currently all bans in filter must be present for row to be valid
      // i want bans to be x champ or y champ
      // maybe make a special option to switch from "and" to "or"
      if (!filterSelectionTemp[name](row, filter, name, 1)) return false;
    }

    return true;
  }

  const getColData = (item, data, avg) => {
    const newData = [];
    for (const [year, yrData] of Object.entries(data)) {
      let sum = 0, count = 0;
      yrData.forEach(row => {
        if (row[item] != null) {
          sum += row[item];
          count += 1;
        }
      });

      const number = (avg) ? Number((sum / count).toFixed(2)) : sum;
      newData.push({ Year: year, [item]: number || 0 });
    }

    // console.log(`${item} ${avg}`);
    return newData;
  };

  if (loading) {
    return (<Spinner />);
  }

  let arrange = "";
  if (layout == 1) {
    arrange = "grid grid-cols-3";
  } else if (layout == 2) {
    arrange = "grid grid-cols-4";
  }

  return (
    <>
      <NamePlate name={playername}/>
      <StatToolbar 
        state={{show: show, setShow: changeShow}} 
        layoutState={{layout: layout, setLayout: setLayout}}
      />
      <FilterToolbar 
        choices={staticData} 
        setFilter={setFilters} 
        games={Object.values(filteredData).reduce((sum, arr) => sum + arr.length, 0)}
      />

      <div className={`${arrange} place-items-center`}>
        {show.map((item, index) => 
          item[2] ? (
          <div 
            className="h-96 w-[96%] mx-auto flex flex-col gap-8 items-center justify-center border-solid border-zinc-800 bg-zinc-800/40 border-2 rounded-lg mb-10" 
            key={item[0]}
          >
            <span> {item[0]} </span>
            <LineGraph 
              color={index % 11} // maybe define this constant somewhere (is # of gradient colors)
              data={getColData(item[0], filteredData, averages.has(item[3]))}
              ydata={item[0]}
            />
          </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default Player;