import pandas as pd
import os

# change as needed
top_leagues = ["LCK", "LPL", "LEC", "LCS"]
years = ["2019", "2020", "2021", "2022", "2023", "2024"]
columns = [
  "gameid", 
  "datacompleteness", 
  "league", 
  "year", 
  "split", 
  "playoffs", 
  "date", 
  "game", 
  "patch", 
  "side", 
  "position", 
  "playername", 
  "teamname", 
  "champion", 
  "ban1", 
  "ban2", 
  "ban3", 
  "ban4", 
  "ban5", 
  "gamelength", 
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
  "earned gpm", 
  "earnedgoldshare", 
  "goldspent", 
  "total cs", 
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
]

# organize data
os.mkdir("./data")
for year in years:
  df = pd.read_csv(f"./datasets/{year}_data.csv")

  path = "./data"
  
  pro_league = df[df["league"].isin(top_leagues)]
  pro_league = pro_league[columns]
  pro_league.to_csv(f"{path}/data_{year}.csv", index=False)

"""
  gameid, 
  datacompleteness, 
  league, 
  year, 
  split, 
  playoffs, 
  date, 
  game, 
  patch, 
  side, 
  position, 
  playername, 
  teamname, 
  champion, 
  ban1, 
  ban2, 
  ban3, 
  ban4, 
  ban5, 
  gamelength, 
  result, 
  kills, 
  deaths, 
  assists, 
  doublekills, 
  triplekills, 
  quadrakills, 
  pentakills, 
  firstbloodkill, 
  firstbloodvictim, 
  ckpm, 
  damagetochampions, 
  dpm, 
  damageshare, 
  damagetakenperminute, 
  damagemitigatedperminute, 
  wardsplaced, 
  wpm, 
  wardskilled, 
  wcpm, 
  controlwardsbought, 
  visionscore, 
  vspm, 
  totalgold, 
  earnedgold, 
  earned gpm, 
  earnedgoldshare, 
  goldspent, 
  total cs, 
  minionkills, 
  monsterkills, 
  cspm, 
  golddiffat10, 
  xpdiffat10, 
  csdiffat10, 
  killsat10, 
  assistsat10, 
  deathsat10, 
  golddiffat15, 
  xpdiffat15, 
  csdiffat15, 
  killsat15, 
  assistsat15, 
  deathsat15, 
  golddiffat20, 
  xpdiffat20, 
  csdiffat20, 
  killsat20, 
  assistsat20, 
  deathsat20, 
  golddiffat25, 
  xpdiffat25, 
  csdiffat25, 
  killsat25, 
  assistsat25, 
  deathsat25,
"""
    