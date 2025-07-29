import Player from '@/components/Player/Player';
import { collectGraphData, collectPageData } from '@/app/actions';

export default async function ServerPage({ params }) {
  const start = performance.now();

  // data fetching
  const { playername } = await params;
  const champData = (
    await fetch('https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json', {
      cache: 'force-cache',
    }).then((res) => res.json())
  ).data;
  const champions = Object.values(champData).map((champ) => champ.name);

  const [graphData, pageData] = await Promise.all([
    collectGraphData(playername),
    collectPageData(),
  ]);

  const end = performance.now();
  console.log(end - start);
  const staticData = {
    champion: champions,
    bans: champions,
    ...pageData,
  };

  return <Player playername={playername} graphData={graphData} staticData={staticData} />;
}
