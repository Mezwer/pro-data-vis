import pandas as pd
import numpy as np

GREEN = '\033[92m'
RESET = '\033[0m'
RED = '\033[91m'

"""
check for any discrepancies in pick/ban

just because something is found does not necessarily mean there is something wrong; sometimes the data is malformed, so these checks will fail.
sometimes the data is malformed because there was a "no ban" (my theory is that when there is a noban a champion is just filled into the data).
"""
def check_champion_discrepancies(df: pd.DataFrame):
  SHOW_DATA = True
  pick_cols = ["blue_pick1", "blue_pick2", "blue_pick3", "blue_pick4", "blue_pick5", "red_pick1", "red_pick2", "red_pick3", "red_pick4", "red_pick5"]
  ban_cols = ["blue_ban1", "blue_ban2", "blue_ban3", "blue_ban4", "blue_ban5", "red_ban1", "red_ban2", "red_ban3", "red_ban4", "red_ban5"]

  for i, row in df.iterrows():
    pickban = row.loc[pick_cols + ban_cols].values
    set_pickban = set(pickban)
    if len(set(set_pickban)) != 20:
      print(RED + f"Pick/Bans do not total to 20. Found at Row {i}.{'' if SHOW_DATA else RESET}")
      print(f"Data is {pickban}, set check is {set_pickban}" + RESET) if SHOW_DATA else None
    
    picks = row.loc[pick_cols].values
    bans = row.loc[ban_cols].values
    player_pick = row.loc["champion"]
    
    if player_pick not in picks:
      print(RED + f"Player pick not in picks. Found at Row {i}." + RESET)
    
    if player_pick in bans:
      print(RED + f"Player pick in bans. Found at Row {i}." + RESET)
  
  print(GREEN + f"✓ Finished champion checks." + RESET)


"""
Discrepancies for np.float64('nan') can more or less be ignored, because np.float64('nan') are all unique for some reason,
so the len(set()) check will fail. All the LPL discrepancies (from what I can tell) can be attributed to the data not being
there. Also, there are sometimes just gaps in the data, and that might require some manual inspection.
"""
def check_data_discrepancies(df: pd.DataFrame):
  IGNORE_PARTIAL = True
  IGNORE_NAN = True
  for i, batch in df.groupby(df.index // 10):
    data_completeness = list(set(batch["datacompleteness"].tolist()))[0]
    region = set(batch["league"].tolist())
    new = batch.drop(df.columns[0:92], axis=1)
    cols = new.columns.tolist()

    for col in cols:
      blue = batch[col].iloc[0:5].values
      red = batch[col].iloc[5:11].values

      if (not IGNORE_PARTIAL or data_completeness != "partial") and (not IGNORE_NAN and not pd.isna(blue).all() and not pd.isna(red).all()):
        indices = batch.index.tolist()
        where = f"{indices[0]} - {indices[-1]}"
        if len(set(blue)) != 1:
          print(RED + f"Data for blue team does not match for {col}. Found at {where}, where the data completion is: {data_completeness} and the league is {region}")
          print(f"Data was {blue}" + RESET)
        if len(set(red)) != 1:
          print(RED + f"Data for red team does not match for {col}. Found at {where}, where the data completion is: {data_completeness} and the league is {region}")
          print(f"Data was {red}" + RESET)

  print(GREEN + f"✓ Finished data checks." + RESET)

def check_team_discrepancies(df: pd.DataFrame):
  for i, batch in df.groupby(df.index // 10):
    teams = batch["teamname"].tolist()
    mirror = batch["opp_teamname"].tolist()
    mirror.reverse()

    if teams != mirror:
      print(RED + f"Teams do not match at row: {i}." + RESET)

  print(GREEN + f"✓ Finished team checks." + RESET)



yr = 2018
df = pd.read_csv(f"./data/new_data2_{yr}.csv")
check_champion_discrepancies(df)
check_data_discrepancies(df)
check_team_discrepancies(df)