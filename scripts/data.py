import pandas as pd
import os

# df = pd.read_csv("lck_data_2023.csv")
GREEN = '\033[92m'
RESET = '\033[0m'
RED = '\033[91m'
data_path = "./data"

"""
returns the matches played between teams for a given data set (region).
example:
  T1-DRX: {matches t1 and drx have played vs each other}

args:
  df: data frame of a given region
"""
def get_num_vs_matches(df):
  teams = df[df["playername"].isnull()]

  sets = {}
  for i in range(0, len(teams), 2):
    blue = teams.iloc[i]
    red = teams.iloc[i+1]
    
    blue_teamname = blue["teamname"]
    red_teamname = red["teamname"]

    team_comb_1 = blue_teamname + "-" + red_teamname
    if team_comb_1 in sets:
      sets[team_comb_1] += 1
      continue

    team_comb_2 = red_teamname + "-" + blue_teamname
    if team_comb_2 in sets:
      sets[team_comb_2] += 1
      continue
    else:
      sets[team_comb_1] = 1

def num_matches(df):
  teams = df[df["playername"].isnull()]

  return len(teams) / 2

def get_player_total_data(df, player, field):
  player_stats = df[df["playername"].str.lower() == player.lower()]
  
  total = 0
  rows = 0
  for _, row in player_stats.iterrows():
    total += row[field]
    rows += 1
  
  # print(f"{player} {field} in {player_stats.iloc[0]['year']}: {total}")
  item = {
    "year": player_stats.iloc[0]['year'],
    "stat": total,
    "rows": rows,
  }

  return item

def player_data_career_graph(dfs, player, field):
  for df in dfs:
    get_player_total_data(df, player, field)

def get_all_data_years(league):
  data = []
  check = league.lower()
  for year_data in os.listdir(data_path):
    league_data_path = os.path.join(data_path, year_data)
    for league_data in os.listdir(league_data_path):
      if check in league_data:
        file_path = os.path.join(league_data_path, league_data)
        data.append(pd.read_csv(file_path))
  
  return data

def get_rows(df, playername):
  new = []

  player_stats = df[df["playername"] == playername]
  for _, row in player_stats.iterrows():
    new.append(row)
  
  frame = pd.DataFrame(new)
  frame.to_csv("./res.csv", index=False)

"""
check for any discrepancies in pick/ban

just because something is found does not necessarily mean there is something wrong
should check though
"""
def check_champion_discrepancies(df: pd.DataFrame):
  pick_cols = ["blue_pick1", "blue_pick2", "blue_pick3", "blue_pick4", "blue_pick5", "red_pick1", "red_pick2", "red_pick3", "red_pick4", "red_pick5"]
  ban_cols = ["blue_ban1", "blue_ban2", "blue_ban3", "blue_ban4", "blue_ban5", "red_ban1", "red_ban2", "red_ban3", "red_ban4", "red_ban5"]

  for i, row in df.iterrows():
    pickban = row.loc[pick_cols + ban_cols].values
    if len(set(pickban)) != 20:
      print(RED + f"Pick/Bans do not total to 20. Found at Row {i}." + RESET)
    
    picks = row.loc[pick_cols].values
    bans = row.loc[ban_cols].values
    player_pick = row.loc["champion"]
    
    if player_pick not in picks:
      print(RED + f"Player pick not in picks. Found at Row {i}." + RESET)
    
    if player_pick in bans:
      print(RED + f"Player pick in bans. Found at Row {i}." + RESET)
  
  print(GREEN + f"✓ Finished checks." + RESET)


"""
LPL discrepancies can more or less be ignored, because np.float64('nan') are all unique for some reason,
so the len(set()) check will fail. All the LPL discrepancies can be attributed to the data not being
there (pretty sure). Also, there are sometimes just gaps in the data.
"""
def check_data_discrepancies(df: pd.DataFrame):
  IGNORE_PARTIAL = True
  for i, batch in df.groupby(df.index // 10):
    datacomp = list(set(batch["datacompleteness"].tolist()))[0]
    new = batch.drop(df.columns[0:92], axis=1)
    cols = new.columns.tolist()

    for col in cols:
      blue = batch[col].iloc[0:5].values
      red = batch[col].iloc[5:11].values

      indices = batch.index.tolist()
      where = f"{indices[0]} - {indices[-1]}"
      if not IGNORE_PARTIAL or datacomp != "partial":
        if len(set(blue)) != 1:
          print(RED + f"Data for blue team does not match for {col}. Found at {where}, where the data completion is: {datacomp}" + RESET)
        if len(set(red)) != 1:
          print(RED + f"Data for red team does not match for {col}. Found at {where}, where the data completion is: {datacomp}" + RESET)

  print(GREEN + f"✓ Finished checks." + RESET)

df = pd.read_csv("./new_data2.csv")
# check_champion_discrepancies(df)
check_data_discrepancies(df)