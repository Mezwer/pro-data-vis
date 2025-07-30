'use client';
import { createContext, useState } from 'react';
import { filterSelectionTemp, filterSelection } from '@/constants/filters';

export const AppContext = createContext();

export const StateProvider = ({ children }) => {
  const [useAverages, setUseAverages] = useState(false);
  // layout of graphs: 0 = vertical, 1 = compact, 2 = more compact
  const [layout, setLayout] = useState(1);
  // how fine the data is: 0 = by year, 1 = by split, 2 = by split, separate playoffs
  const [granularity, setGranularity] = useState(0);
  // 1 = split, 0 = no split
  const [split, setSplit] = useState(0);

  const [showGap, setShowGap] = useState(false);

  const [filterType, setFilterType] = useState(
    Object.fromEntries(Object.keys(filterSelectionTemp).map((filter) => [filter, 1]))
  );

  const [filters, setFilters] = useState(Object.fromEntries(filterSelection.map((filter) => [filter, []])));

  const value = {
    useAverages,
    layout,
    granularity,
    split,
    filterType,
    filters,
    showGap,

    setUseAverages,
    setLayout,
    setGranularity,
    setSplit,
    setFilterType,
    setFilters,
    setShowGap,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
