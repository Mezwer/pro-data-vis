import { Player } from '@/components';
import { collectGraphData, collectPageData } from '@/app/actions';

export default async function ServerPage({ params }) {
  const start = performance.now();

  // data fetching
  const { playername } = await params;
  const championRes = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json'
  ); // champion names
  const champData = (await championRes.json()).data;
  const champions = Object.keys(champData).map((item) => champData[item].name);

  const graphRes = await collectGraphData(playername);
  const pageData = await collectPageData();

  const end = performance.now();
  // console.log(end - start);

  const staticData = {
    champion: champions,
    bans: champions,
    ...pageData,
  };

  return <Player playername={playername} graphData={graphRes} staticData={staticData} />;
}
