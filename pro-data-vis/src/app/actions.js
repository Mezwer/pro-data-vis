'use server';
import { neon } from '@neondatabase/serverless';
import { fields, years, mapping } from '@/constants/fields.js';
import { filterSelection, filterBans, filterPicks, filterNumeric } from '@/constants/filters';

const sql = neon(process.env.DATABASE_URL);

export async function collectGraphData(player) {
  const start = performance.now();
  const selectFields = [
    ...fields.map((field) => `${field}::DOUBLE PRECISION AS "${mapping[field]}"`),
    ...filterSelection,
    ...filterNumeric.map((field) => `${field}::DOUBLE PRECISION`),
    `ARRAY[${filterPicks.join(',')}] as Picks`,
    `ARRAY[${filterBans.join(',')}] as Bans`,
  ].join(',');

  const yearQueries = years.map(async (year) => {
    const tablename = `data_${year}_new`;
    const query = `SELECT ${selectFields}, '${year % 100}' as "Year" FROM ${tablename} WHERE playername = $1 ORDER BY date, game`;

    try {
      const result = await sql(query, [player]);
      return { year: year % 100, data: result };
    } catch (error) {
      console.error(`Error fetching data for year ${year}:`, error);
      return { year: year % 100, data: [] };
    }
  });

  const results = await Promise.allSettled(yearQueries);
  const groupedRes = results.reduce((acc, result) => {
    if (result.status === 'fulfilled' && result.value.data.length > 0) {
      acc[result.value.year] = result.value.data;
    }
    return acc;
  }, {});

  const end = performance.now();
  // console.log(`COLLECT GRAPH DATA: ${end - start}ms`);

  return groupedRes;
}

export async function collectPageData() {
  const start = performance.now();
  const selectFields = ['teamname', 'league'].join(',');
  const queries = years
    .map((year) => {
      const tablename = `data_${year}_new`;
      return `(SELECT ${selectFields} FROM ${tablename})`;
    })
    .join(' UNION ');

  const timeQuery = years
    .map((year) => {
      const tablename = `data_${year}_new`;
      return `SELECT gamelength FROM ${tablename}`;
    })
    .join(' UNION ALL ');

  // place in separate functions if more speed up needed
  const [result, time] = await Promise.all([
    sql(queries),
    sql(`SELECT max(gamelength) FROM (${timeQuery}) AS all_games`),
  ]);

  const names = [...new Set(result.map((teamname) => teamname.teamname))].sort();
  const league = [...new Set(result.map((league) => league.league))].sort();
  const end = performance.now();

  // console.log(`COLLECT PAGE DATA: ${end - start}ms`);

  return {
    opp_teamname: names,
    league: league,
    maxTime: time[0].max,
  };
}

// export async function collectRadarData() {}
