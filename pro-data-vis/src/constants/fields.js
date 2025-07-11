
// only summable fields
export const fields = [
  "result",
  "kills",
  "deaths",
  "assists",
  "doublekills",
  "triplekills",
  "quadrakills",
  "pentakills",
  "firstbloodkill",
  "firstbloodvictim",
  "ckpm",
  "damagetochampions",
  "dpm",
  "damageshare",
  "damagetakenperminute",
  "damagemitigatedperminute",
  "wardsplaced",
  "wpm",
  "wardskilled",
  "wcpm",
  "controlwardsbought",
  "visionscore",
  "vspm",
  "totalgold",
  "earnedgold",
  "earned_gpm",
  "earnedgoldshare",
  "goldspent",
  "total_cs",
  "minionkills",
  "monsterkills",
  "cspm",
  "golddiffat10",
  "xpdiffat10",
  "csdiffat10",
  "killsat10",
  "assistsat10",
  "deathsat10",
  "golddiffat15",
  "xpdiffat15",
  "csdiffat15",
  "killsat15",
  "assistsat15",
  "deathsat15",
  "golddiffat20",
  "xpdiffat20",
  "csdiffat20",
  "killsat20",
  "assistsat20",
  "deathsat20",
  "golddiffat25",
  "xpdiffat25",
  "csdiffat25",
  "killsat25",
  "assistsat25",
  "deathsat25",
];

export const mapping = {
  league: "League", // probably unused?
  year: "Year",
  split: "Split",
  playoffs: "Playoffs",
  date: "Date",
  game: "Game",
  patch: "Patch",
  side: "Side",
  position: "Position",
  playername: "Player Name", // probably unused?
  teamname: "Team Name",
  champion: "Champion",
  ban1: "Ban1",
  ban2: "Ban2",
  ban3: "Ban3",
  ban4: "Ban4",
  ban5: "Ban5",
  gamelength: "Game Length",
  result: "Win Rate",
  kills: "Kills",
  deaths: "Deaths",
  assists: "Assists",
  doublekills: "Double Kills",
  triplekills: "Triple Kills",
  quadrakills: "Quadra Kills",
  pentakills: "Penta Kills",
  firstbloodkill: "First Blood Kill",
  firstbloodvictim: "First Blood Victim",
  ckpm: "CKPM",
  damagetochampions: "DMG To Champions",
  dpm: "DPM",
  damageshare: "Damage Share",
  damagetakenperminute: "DMG Taken/Min",
  damagemitigatedperminute: "DMG Mitigated/Min",
  wardsplaced: "Wards Placed",
  wpm: "WPM",
  wardskilled: "Wards Killed",
  wcpm: "WCPM",
  controlwardsbought: "Control Wards",
  visionscore: "Vision Score",
  vspm: "VSPM",
  totalgold: "Total Gold",
  earnedgold: "Earned Gold",
  earned_gpm: "Earned GPM",
  earnedgoldshare: "Earned Gold Share",
  goldspent: "Gold Spent",
  total_cs: "Total CS",
  minionkills: "Minion Kills",
  monsterkills: "Monster Kills",
  cspm: "CSPM",
  golddiffat10: "Gold Diff @ 10",
  xpdiffat10: "XP Diff @ 10",
  csdiffat10: "CS Diff @ 10",
  killsat10: "Kills @ 10",
  assistsat10: "Assists @ 10",
  deathsat10: "Deaths @ 10",
  golddiffat15: "Gold Diff @ 15",
  xpdiffat15: "XP Diff @ 15",
  csdiffat15: "CS Diff @ 15",
  killsat15: "Kills @ 15",
  assistsat15: "Assists @ 15",
  deathsat15: "Deaths @ 15",
  golddiffat20: "Gold Diff @ 20",
  xpdiffat20: "XP Diff @ 20",
  csdiffat20: "CS Diff @ 20",
  killsat20: "Kills @ 20",
  assistsat20: "Assists @ 20",
  deathsat20: "Deaths @ 20",
  golddiffat25: "Gold Diff @ 25",
  xpdiffat25: "XP Diff @ 25",
  csdiffat25: "CS Diff @ 25",
  killsat25: "Kills @ 25",
  assistsat25: "Assists @ 25",
  deathsat25: "Deaths @ 25",

  // filters
  champions: "Champion",
  opp_teamname: "Opposing Team",
  win: "Win",
  loss: "Loss",
  blue: "Blue",
  red: "Red",
  bans: "Ban",
};

export const staticColors = [ 
  "#007BFF",
  "#FF5733",
  "#39FF14",
  "#00FFFF",
  "#9B30FF",
  "#FFC300",
  "#FF2400",
  "#40E0D0",
  "#FF1493",
  "#DFFF00",
  "#8A2BE2",
  "#FF00FF",
];

const createColors = () => {
  const colors = {}
  let index = 0;
  for (const [_, value] of Object.entries(mapping)) {
    colors[value] = staticColors[index++];
    if (index >= staticColors.length) 
      index = 0;
  }

  return colors;
};

export const colors = createColors();


export const chartConfigs = [
  {
    id: 'gradient1',
    title: 'Electric Blue',
    stops: [
      { offset: '0%', color: '#06b6d4', opacity: 0.9 },
      { offset: '50%', color: '#0891b2', opacity: 0.5 },
      { offset: '100%', color: '#0e7490', opacity: 0.1 }
    ],
    stroke: '#06b6d4'
  },
  {
    id: 'gradient2',
    title: 'Emerald Green',
    stops: [
      { offset: '0%', color: '#10b981', opacity: 0.9 },
      { offset: '50%', color: '#059669', opacity: 0.5 },
      { offset: '100%', color: '#047857', opacity: 0.1 }
    ],
    stroke: '#10b981'
  },
  {
    id: 'gradient3',
    title: 'Sunset Orange',
    stops: [
      { offset: '0%', color: '#f97316', opacity: 0.9 },
      { offset: '50%', color: '#ea580c', opacity: 0.5 },
      { offset: '100%', color: '#c2410c', opacity: 0.1 }
    ],
    stroke: '#f97316'
  },
  {
    id: 'gradient4',
    title: 'Rose Pink',
    stops: [
      { offset: '0%', color: '#f43f5e', opacity: 0.9 },
      { offset: '50%', color: '#e11d48', opacity: 0.5 },
      { offset: '100%', color: '#be123c', opacity: 0.1 }
    ],
    stroke: '#f43f5e'
  },
  {
    id: 'gradient5',
    title: 'Golden Yellow',
    stops: [
      { offset: '0%', color: '#eab308', opacity: 0.9 },
      { offset: '50%', color: '#ca8a04', opacity: 0.5 },
      { offset: '100%', color: '#a16207', opacity: 0.1 }
    ],
    stroke: '#eab308'
  },
  {
    id: 'gradient6',
    title: 'Violet Dream',
    stops: [
      { offset: '0%', color: '#8b5cf6', opacity: 0.9 },
      { offset: '50%', color: '#7c3aed', opacity: 0.5 },
      { offset: '100%', color: '#6d28d9', opacity: 0.1 }
    ],
    stroke: '#8b5cf6'
  },
  {
    id: 'gradient7',
    title: 'Teal Mint',
    stops: [
      { offset: '0%', color: '#14b8a6', opacity: 0.9 },
      { offset: '50%', color: '#0d9488', opacity: 0.5 },
      { offset: '100%', color: '#0f766e', opacity: 0.1 }
    ],
    stroke: '#14b8a6'
  },
  {
    id: 'gradient8',
    title: 'Crimson Red',
    stops: [
      { offset: '0%', color: '#dc2626', opacity: 0.9 },
      { offset: '50%', color: '#b91c1c', opacity: 0.5 },
      { offset: '100%', color: '#991b1b', opacity: 0.1 }
    ],
    stroke: '#dc2626'
  },
  {
    id: 'gradient9',
    title: 'Sky Blue',
    stops: [
      { offset: '0%', color: '#0ea5e9', opacity: 0.9 },
      { offset: '50%', color: '#0284c7', opacity: 0.5 },
      { offset: '100%', color: '#0369a1', opacity: 0.1 }
    ],
    stroke: '#0ea5e9'
  },
  {
    id: 'gradient10',
    title: 'Lime Green',
    stops: [
      { offset: '0%', color: '#65a30d', opacity: 0.9 },
      { offset: '50%', color: '#4d7c0f', opacity: 0.5 },
      { offset: '100%', color: '#365314', opacity: 0.1 }
    ],
    stroke: '#65a30d'
  },
  {
    id: 'gradient11',
    title: 'Steel Blue',
    stops: [
      { offset: '0%', color: '#64748b', opacity: 0.9 },
      { offset: '50%', color: '#475569', opacity: 0.5 },
      { offset: '100%', color: '#334155', opacity: 0.1 }
    ],
    stroke: '#64748b'
  },
  {
    id: 'gradient12',
    title: 'Magenta Burst',
    stops: [
      { offset: '0%', color: '#d946ef', opacity: 0.9 },
      { offset: '50%', color: '#c026d3', opacity: 0.5 },
      { offset: '100%', color: '#a21caf', opacity: 0.1 }
    ],
    stroke: '#d946ef'
  },
];

export const years = [ 2022, 2023, 2024 ]; // will add more years after testing done

export const averages = new Set([
  "result",
  "ckpm",
  "dpm",
  "damageshare",
  "damagetakenperminute",
  "damagemitigatedperminute",
  "wpm",
  "wcpm",
  "visionscore",
  "vspm",
  "earned_gpm",
  "earnedgoldshare",
  "cspm",
  "golddiffat10",
  "xpdiffat10",
  "csdiffat10",
  "killsat10",
  "assistsat10",
  "deathsat10",
  "golddiffat15",
  "xpdiffat15",
  "csdiffat15",
  "killsat15",
  "assistsat15",
  "deathsat15",
  "golddiffat20",
  "xpdiffat20",
  "csdiffat20",
  "killsat20",
  "assistsat20",
  "deathsat20",
  "golddiffat25",
  "xpdiffat25",
  "csdiffat25",
  "killsat25",
  "assistsat25",
  "deathsat25",
]);

export const descriptions = {
  "Kills": "Total number of kills throughout the year.",
  "Deaths": "Total number of deaths throughout the year",
  "Assists": "Total number of assists throughout the year",
  "Double Kills": "Total number of double kills throughout the year",
  "Triple Kills": "Total number of triple kills throughout the year",
  "Quadra Kills": "Total number of quadra kills throughout the year",
  "Penta Kills": "Total number of penta kills throughout the year",
  "First Blood Kill": "Total number of first blood kills throughout the year",
  "First Blood Victim": "Total number of times the player was a first blood victim throughout the year",
  "CKPM": "Average champion kills per minute across the year",
  "DMG To Champions": "Total damage to champions throughout the year",
  "DPM": "Average damage per minute across the year",
  "Damage Share": "Average damage share throughout the year",
  "DMG Taken/Min": "Average damage taken per minute throughout the year",
  "DMG Mitigated/Min": "Average damage mitigated per minute throughout the year",
  "Wards Placed": "Total wards placed throughout the year",
  "WPM": "Average wards placed per minute across the year",
  "Wards Killed": "Total wards killed throughout the year",
  "WCPM": "",
  "Control Wards": "Control wards bought throughout the year",
  "Vision Score": "Total vision score throughout the year",
  "VSPM": "Average vision score per minute across the year",
  "Total Gold": "Total gold throughout the year",
  "Earned Gold": "Total earned gold throughout the year",
  "Earned GPM": "Average earned gold per minute across the year",
  "Earned Gold Share": "Average earned gold share across the year",
  "Gold Spent": "Total gold spent throughout the year",
  "Total CS": "Total Creep Score (Minion + Jungle camp kills) throughout the year",
  "Minion Kills": "",
  "Monster Kills": "",
  "CSPM": "Creep Score per minute",
  "Gold Diff @ 10": "",
  "XP Diff @ 10": "",
  "CS Diff @ 10": "",
  "Kills @ 10": "",
  "Assists @ 10": "",
  "Deaths @ 10": "",
  "Gold Diff @ 15": "",
  "XP Diff @ 15": "",
  "CS Diff @ 15": "",
  "Kills @ 15": "",
  "Assists @ 15": "",
  "Deaths @ 15": "",
  "Gold Diff @ 20": "",
  "XP Diff @ 20": "",
  "CS Diff @ 20": "",
  "Kills @ 20": "",
  "Assists @ 20": "",
  "Deaths @ 20": "",
  "Gold Diff @ 25": "",
  "XP Diff @ 25": "",
  "CS Diff @ 25": "",
  "Kills @ 25": "",
  "Assists @ 25": "",
  "Deaths @ 25": "",
  "Win Rate": "",
};