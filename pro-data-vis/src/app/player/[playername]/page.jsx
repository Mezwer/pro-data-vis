// import React from "react";
import { Player } from "@/components";
import { collectGraphData } from "@/app/actions";
import { neon } from "@neondatabase/serverless";

export default async function ServerPage({ params }) {
  const start = performance.now();
  
  // data fetching
  const { playername } = await params;
  const championRes = await fetch("https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"); // champion names 
  const champions = (await championRes.json()).data;

  const graphRes = await collectGraphData(playername);

  const end = performance.now();
  console.log(end - start);

  return (
    <Player 
      playername={playername} 
      graphData={graphRes} 
      champions={Object.keys(champions).map((item) => champions[item].name)}/>
  );
};

// export default PlayerPage;