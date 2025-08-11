'use server';
import { neon } from '@neondatabase/serverless';
import { fields, years, mapping, averages } from '@/constants/fields.js';
import { filterSelection, filterBans, filterPicks, filterNumeric } from '@/constants/filters';

const sql = neon(process.env.DATABASE_URL);

export async function collectGraphData(player) {
  const selectFields = [
    ...fields.map((field) => `${field}::DOUBLE PRECISION AS "${mapping[field]}"`),
    ...filterSelection,
    ...filterNumeric.map((field) => `${field}::DOUBLE PRECISION`),
    `ARRAY[${filterPicks.join(',')}] as Picks`,
    `ARRAY[${filterBans.join(',')}] as Bans`,
  ].join(',');

  // Use a UNION ALL query to fetch data for all years in a single database call
  const queries = years.map((year) => {
    const tablename = `data_${year}_new`;
    return `(SELECT ${selectFields}, '${year % 100}' as "Year" FROM ${tablename} WHERE playername = '${player}' ORDER BY date, game)`;
  });

  const unionQuery = queries.join(' UNION ALL ');
  const result = await sql(unionQuery);

  const groupedRes = result.reduce((acc, row) => {
    const year = row.Year;

    if (!acc[year]) acc[year] = [row];
    else acc[year].push(row);

    return acc;
  }, {});

  return groupedRes;
}

export async function collectPageData() {
  const selectFields = ['teamname', 'league'].join(',');
  const queries = years
    .map((year) => {
      const tablename = `data_${year}_new`;
      return `(SELECT ${selectFields} FROM ${tablename})`;
    })
    .join(' UNION ');

  // console.log(queries);
  const result = await sql(queries);

  const timeQuery = years
    .map((year) => {
      const tablename = `data_${year}_new`;
      return `SELECT gamelength FROM ${tablename}`;
    })
    .join(' UNION ALL ');

  const time = await sql(`SELECT max(gamelength) FROM (${timeQuery}) AS all_games`);

  const names = [...new Set(result.map((teamname) => teamname.teamname))].sort();
  const league = [...new Set(result.map((league) => league.league))].sort();

  return {
    opp_teamname: names,
    league: league,
    maxTime: time[0].max,
  };
}
