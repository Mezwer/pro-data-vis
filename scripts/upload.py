import pandas as pd
import os

# change as needed
top_leagues = ["LCK", "LPL", "LEC", "LCS"]
years = ["2022", "2023", "2024"]

# organize data
os.mkdir("./data")
for year in years:
  df = pd.read_csv(f"datasets/{year}_data.csv")

  path = f"./data/{year}_data"
  os.mkdir(path)
  
  for league in top_leagues:
    pro_league = df[df["league"] == league]
    pro_league.to_csv(f"{path}/{league.lower()}_data_{year}.csv", index=False)
    