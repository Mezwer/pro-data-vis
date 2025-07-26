import { NextResponse } from 'next/server';
import { collectGraphData } from '@/app/actions.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const playername = searchParams.get('playername');

    const start = performance.now();
    const data = await collectGraphData(playername);
    const end = performance.now();

    console.log(`TIME OF GRAPH COLLECTION: ${end - start} MS`);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
