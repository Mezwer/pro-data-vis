"use server";
import { neon } from "@neondatabase/serverless";
import { fields, years, mapping, averages } from "@/constants/fields.js";

const sql = neon(process.env.DATABASE_URL);

export async function collectGraphData(player, filters) {
  const start = performance.now();
  let select = "";
  
  // Build the SELECT part of the query
  for (const field of fields) {
    select += `ROUND(${averages.has(field) ? "AVG" : "SUM"}("${field}"), 2)::DOUBLE PRECISION as "${mapping[field]}", `;
  }
  select = select.slice(0, select.length - 2);
  
  // Use a UNION ALL query to fetch data for all years in a single database call
  const queries = years.map(year => {
    const tablename = `data_${year}`;
    return `(SELECT ${select}, '${year % 100}' as "Year" FROM ${tablename} WHERE playername IS NOT NULL AND playername = $1)`;
  });
  
  const unionQuery = queries.join(" UNION ALL ") + " ORDER BY \"Year\" ASC";;
  const result = await sql(unionQuery, [player]);
  
  const end = performance.now();
  return result;
}