import pandas as pd
import os

# df = pd.read_csv("lck_data_2023.csv")
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
  for _, row in player_stats.iterrows():
    total += row[field]
  
  # print(f"{player} {field} in {player_stats.iloc[0]['year']}: {total}")
  item = {
    "year": player_stats.iloc[0]['year'],
    "stat": total
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

player_data_career_graph(get_all_data_years("LCK"), "Faker", "kills")
# dfs = get_all_data_years("LCK")
# print(num_matches(dfs[0]))