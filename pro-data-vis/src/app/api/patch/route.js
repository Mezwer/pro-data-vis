import { NextResponse } from 'next/server';
import { collectCounts } from '@/app/actions.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const playername = searchParams.get('playername');

    const start = performance.now();
    const data = await collectCounts(playername);
    const end = performance.now();

    console.log(`TIME OF COUNT COLLECTION: ${end - start} MS`);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
