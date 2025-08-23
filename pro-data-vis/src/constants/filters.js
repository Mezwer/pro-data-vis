import { ListChecks, SquaresExclude } from 'lucide-react';
import { descriptions } from './fields';
// fields that are for filtering

// everything not in select basically
export const filterSelection = [
  'league',
  'split',
  'playoffs',
  'date',
  'game',
  'patch',
  'side',
  'position',
  'teamname',
  'champion',
  'gamelength',
  'result',
  'opp_teamname',
];

/**
 * To be used in a mapping from filter -> function for use in Player.jsx.
 *
 * Used when you need to filter by if something is included/excluded from a filter
 *
 * @param {Object} row - row of a list to validate
 * @param {Array} filter - array of parameters to filter by
 * @param {string} name - name of what to filter ```row``` by
 * @param {number} type - 0 for exclude, 1 for include
 * @returns {boolean} returns whether or not the row is "valid" or not based on the filters
 */
function include_exclude(row, filter, name, type) {
  const result = filter.includes(row[name]);
  return type === 0 ? !result : result;
}

/**
 * To be used in a mapping from filter -> function for use in Player.jsx.
 *
 * Used when you need to filter by if something in the filter is in the row (opposite of include_exclude)
 * However, there is no exclusion here, and instead type means something different
 *
 * @param {Object} row - row of a list to validate
 * @param {Array} filter - array of parameters to filter by
 * @param {string} name - name of what to filter ```row``` by
 * @param {number} type - 0 for 'OR' logic, 1 for 'AND' logic
 * @returns {boolean} returns whether or not the row is "valid" or not based on the filters
 */
function reverse_include_and_or(row, filter, name, type) {
  const bans = row[name];
  // const result = filter.every((item) => bans.includes(item));
  return type === 0 ? filter.some((item) => bans.includes(item)) : filter.every((item) => bans.includes(item));
}

/**
 * to be used in a mapping from filter -> function for use in Player.jsx,
 *
 * @param {*} row
 * @param {*} filter
 * @param {*} name
 * @param {*} type
 * @returns {boolean} returns whether or not the row is "valid" or not based on the filters
 */
function range_include(row, filter, name, type) {
  const start = filter[0] || 0,
    end = filter[1] || 0;
  return start <= row[name] && row[name] <= end;
}

/**
 * to be used in a mapping from filter -> function for use in Player.jsx,
 *
 * @param {*} row
 * @param {*} filter
 * @param {*} name
 * @param {*} type
 * @returns {boolean} returns whether or not the row is "valid" or not based on the filters
 */
function yes_no(row, filter, name, type) {
  return !(filter[0] || 0) || row[name];
}

// all functions should be of the same signature
export const filterSelectionTemp = {
  champion: include_exclude,
  opp_teamname: include_exclude,
  gamelength: range_include,
  league: include_exclude,
  playoffs: yes_no,
  result: include_exclude,
  side: include_exclude,
  bans: reverse_include_and_or,
};

export const filterToggle = ['playoffs', 'win', 'loss', 'blue', 'red'];

export const filterField = ['champion', 'bans', 'opp_teamname', 'league'];

export const filterBans = [
  'blue_ban1',
  'blue_ban2',
  'blue_ban3',
  'blue_ban4',
  'blue_ban5',
  'red_ban1',
  'red_ban2',
  'red_ban3',
  'red_ban4',
  'red_ban5',
];

export const filterPicks = [
  'blue_pick1',
  'blue_pick2',
  'blue_pick3',
  'blue_pick4',
  'blue_pick5',
  'red_pick1',
  'red_pick2',
  'red_pick3',
  'red_pick4',
  'red_pick5',
];

export const filterNumeric = [
  'opp_kills',
  'opp_deaths',
  'opp_assists',
  'opp_doublekills',
  'opp_triplekills',
  'opp_quadrakills',
  'opp_pentakills',
  'opp_ckpm',
  'opp_damagetochampions',
  'opp_dpm',
  'opp_damagetakenperminute',
  'opp_damagemitigatedperminute',
  'opp_wardsplaced',
  'opp_wpm',
  'opp_wardskilled',
  'opp_wcpm',
  'opp_controlwardsbought',
  'opp_visionscore',
  'opp_vspm',
  'opp_totalgold',
  'opp_earnedgold',
  'opp_earned_gpm',
  'opp_goldspent',
  'opp_minionkills',
  'opp_monsterkills',
  'opp_cspm',
  'opp_golddiffat10',
  'opp_xpdiffat10',
  'opp_csdiffat10',
  'opp_killsat10',
  'opp_assistsat10',
  'opp_deathsat10',
  'opp_golddiffat15',
  'opp_xpdiffat15',
  'opp_csdiffat15',
  'opp_killsat15',
  'opp_assistsat15',
  'opp_deathsat15',
  'opp_golddiffat20',
  'opp_xpdiffat20',
  'opp_csdiffat20',
  'opp_killsat20',
  'opp_assistsat20',
  'opp_deathsat20',
  'opp_golddiffat25',
  'opp_xpdiffat25',
  'opp_csdiffat25',
  'opp_killsat25',
  'opp_assistsat25',
  'opp_deathsat25',
];

// data that was not originally in the dataset
// placeholder for some additional stats
export const filterCalculated = {
  'Kill Participation': '',
  'Death Participation': '',
};

export const filterTypeMap = {
  bans: {
    icon: ListChecks,
    description: 'Toggle for whether all bans must be present (green) or at least one (gray).',
  },
  champion: {
    icon: SquaresExclude,
    description: 'Toggle for whether data will include (green) or exclude (gray) the champion.',
  },
};
