import pandas as pd
import os

data_path = "./data/data_2024.csv"

pick_cols = ["blue_pick1", "blue_pick2", "blue_pick3", "blue_pick4", "blue_pick5", "red_pick1", "red_pick2", "red_pick3", "red_pick4", "red_pick5"]
ban_cols = ["blue_ban1", "blue_ban2", "blue_ban3", "blue_ban4", "blue_ban5", "red_ban1", "red_ban2", "red_ban3", "red_ban4", "red_ban5"]
def add_picks(df: pd.DataFrame):
  batches = []
  for _, batch in df.groupby(df.index // 12):
    # filter out the team rows -> filter champion cols
    all_picks = batch[(batch["position"] != "team")]["champion"].tolist()

    # create new columns for picks
    picks = [[pick] * 10 for pick in (all_picks)]
    batch[pick_cols] = pd.DataFrame({pick_cols[i]: picks[i] for i in range(10)})
    batches.append(batch)
    print(batch)
    break
  return pd.concat(batches, ignore_index=True)

def add_bans(df: pd.DataFrame):
  batches = []
  curr_ban_cols = ["ban1", "ban2", "ban3", "ban4", "ban5"]
  for _, batch in df.groupby(df.index // 12):
    all_bans = batch[batch["position"] == "team"][curr_ban_cols].values.flatten().tolist()

    bans = [[ban] * 10 for ban in all_bans]
    batch.drop(curr_ban_cols, axis=1, inplace=True)

    batch[ban_cols] = pd.DataFrame({ban_cols[i]: bans[i] for i in range(10)})
    batches.append(batch)
    print(batch)
    break
    

add_bans(pd.read_csv(data_path))