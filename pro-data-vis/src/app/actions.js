"use server";
import { neon } from "@neondatabase/serverless";
import { fields, years, mapping } from "@/constants/fields";

const sql = neon(process.env.DATABASE_URL);

export async function collectGraphData(player) {
  const start = performance.now();
  let data = [];
  let select = "";
  for (const field of fields) {
    select += `SUM("${field}")::DOUBLE PRECISION as "${mapping[field]}", `;
  }

  let query = select.slice(0, select.length - 2);
  for (const year of years) {
    const tablename = `data_${year}`;
    const q = `SELECT ${query} FROM ${tablename} WHERE playername = '${player}'`;
    const result = await sql(q);

    data.push(result[0]);
    data[data.length - 1].Year = `'${year % 100}`;
  };

  // console.log(data);
  const end = performance.now();
  return data;
}