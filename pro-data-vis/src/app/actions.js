"use server";
import { neon } from "@neondatabase/serverless";
import { fields, years, mapping, averages } from "@/constants/fields.js";
import { filterSelection } from "@/constants/filters";

const sql = neon(process.env.DATABASE_URL);

export async function collectGraphData(player) {
  const start = performance.now();
  
  const selectFields = [
    ...fields.map(field => `${field}::DOUBLE PRECISION AS "${mapping[field]}"`),
    ...filterSelection
  ].join(",");

  // Use a UNION ALL query to fetch data for all years in a single database call
  const queries = years.map(year => {
    const tablename = `data_${year}_new`;
    return `(SELECT ${selectFields}, '${year % 100}' as "Year" FROM ${tablename} WHERE playername = $1)`;
  });
  
  const unionQuery = queries.join(" UNION ALL ");
  const result = await sql(unionQuery, [player]);
  
  const groupedRes = result.reduce((acc, row) => {
    const year = row.Year;
    if (!acc[year]) {
      acc[year] = [row];
    } else {
      acc[year].push(row);
    }

    return acc;
  }, {});

  // console.log(groupedRes)
  const end = performance.now();
  return groupedRes;
}

export async function collectCounts(player) {
  const start = performance.now();

  let select = ""
  for (const field of fields) {
    select += `COUNT(${field}) as ${field}_count, `
  }
  select = select.slice(0, select.length - 2);

  // console.log(select)
  const queries = years.map(year => {
    const tablename = `data_${year}_new`;
    return `(SELECT ${select}, '${year % 100}' as "Year" FROM ${tablename} WHERE playername IS NOT NULL AND playername = $1)`;
  });

  const unionQuery = queries.join(" UNION ALL ") + " ORDER BY \"Year\" ASC";;
  const result = await sql(unionQuery, [player]);

  const end = performance.now();
  return result;
}