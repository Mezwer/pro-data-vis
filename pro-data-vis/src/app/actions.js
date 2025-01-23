"use server";
import { neon } from "@neondatabase/serverless";
import { fields, years, mapping, averages } from "@/constants/fields.js";

const sql = neon(process.env.DATABASE_URL);

export async function collectGraphData(player) {
  const start = performance.now();
  let data = [];
  let select = "";
  for (const field of fields) {
    select += `ROUND(${averages.has(field) ? "AVG" : "SUM"}("${field}"), 2)::DOUBLE PRECISION as "${mapping[field]}", `;
  }

  let query = select.slice(0, select.length - 2);
  for (const year of years) {
    const tablename = `data_${year}`;
    const q = `SELECT ${query} FROM ${tablename} WHERE playername IS NOT NULL AND playername = '${player}'`;
    const result = await sql(q);

    data.push(result[0]);
    data[data.length - 1].Year = `'${year % 100}`;
  };

  // console.log(data);
  const end = performance.now();
  return data;
}