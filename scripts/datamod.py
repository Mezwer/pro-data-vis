import pandas as pd
import os

GREEN = "\033[92m"
RESET = "\033[0m"

pick_cols = [
    "blue_pick1",
    "blue_pick2",
    "blue_pick3",
    "blue_pick4",
    "blue_pick5",
    "red_pick1",
    "red_pick2",
    "red_pick3",
    "red_pick4",
    "red_pick5",
]
ban_cols = [
    "blue_ban1",
    "blue_ban2",
    "blue_ban3",
    "blue_ban4",
    "blue_ban5",
    "red_ban1",
    "red_ban2",
    "red_ban3",
    "red_ban4",
    "red_ban5",
]
top_leagues = ["LCK", "LPL", "LEC", "LCS", "EU LCS", "NA LCS"]
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


def filter_cols(df: pd.DataFrame):
    new_df = df[df["league"].isin(top_leagues)]
    new_df = new_df[columns]

    print(GREEN + "✓ Finished filtering columns." + RESET)
    return new_df


# basically just filling in the fb team info
def fill_team_info(df: pd.DataFrame):
    batches = []
    fb_cols = [28, 29]  # position of fb_cols
    for _, batch in df.groupby(df.index // 12):
        blue_side = batch[(batch["side"] == "Blue") & (batch["position"] != "team")]

        blue_fbk = blue_side["firstbloodkill"].sum()

        # col_indices = [batch.columns.get_loc(col) for col in fb_cols]
        batch.iloc[10, fb_cols] = [blue_fbk, 0 if blue_fbk else 1]  # blue side
        batch.iloc[11, fb_cols] = [0 if blue_fbk else 1, blue_fbk]  # red side

        batches.append(batch)
        # print(batch)

    print(GREEN + "✓ Finished filling team info." + RESET)
    return pd.concat(batches, ignore_index=True)


def add_picks(df: pd.DataFrame):
    batches = []
    for _, batch in df.groupby(df.index // 12):
        # filter out the team rows -> filter champion cols
        all_picks = batch[batch["position"] != "team"]["champion"].tolist()

        # create new columns for picks
        picks = [[pick] * 10 for pick in (all_picks)]
        new_data = pd.DataFrame({pick_cols[i]: picks[i] for i in range(10)})
        new_data.index = batch.index.tolist()[:10]

        batch[pick_cols] = new_data
        batches.append(batch)
        # print(batch)

    print(GREEN + "✓ Finished adding picks." + RESET)
    return pd.concat(batches, ignore_index=True)


def add_bans(df: pd.DataFrame):
    batches = []
    curr_ban_cols = ["ban1", "ban2", "ban3", "ban4", "ban5"]
    for _, batch in df.groupby(df.index // 12):
        # get team rows -> get all of their bans -> flatten to 1d list
        all_bans = (
            batch[batch["position"] == "team"][curr_ban_cols].values.flatten().tolist()
        )
        bans = [[ban] * 10 for ban in all_bans]

        # drop current ban cols (want them to be renamed)
        batch.drop(curr_ban_cols, axis=1, inplace=True)

        new_data = pd.DataFrame({ban_cols[i]: bans[i] for i in range(10)})
        new_data.index = batch.index.tolist()[:10]

        batch[ban_cols] = new_data
        batches.append(batch)
        # print(batch)

    print(GREEN + "✓ Finished adding bans." + RESET)
    return pd.concat(batches, ignore_index=True)


def merge_rows(df: pd.DataFrame):
    """
    merge "team" rows to player rows
    NOTES:
    don't add these cols from team row to player rows:
    - earned gold share
    - total cs (more dubious but i dont think it makes sense)
    - damage share
    - gameid -> gamelength
    """
    batches = []
    drop_cols = [
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
        "champion",
        "gamelength",
        "damageshare",
        "earnedgoldshare",
        "total cs",
        "firstbloodkill",
        "firstbloodvictim",
        "result",
    ]

    drop_cols += pick_cols
    drop_cols += ban_cols

    for _, batch in df.groupby(df.index // 12):
        # Drop specified columns from the batch
        dropped = batch.drop(drop_cols, axis=1)
        new_cols = [f"opp_{col}" for col in dropped.columns]

        blue_side = dropped.iloc[10].values
        red_side = dropped.iloc[11].values

        new_vals = [
            [red_side[i]] * 5 + [blue_side[i]] * 5 for i in range(len(new_cols))
        ]

        # Create a new DataFrame with the additional columns
        new_data = pd.DataFrame(dict(zip(new_cols, new_vals)), index=batch.index[:10])
        batch = pd.concat([batch, new_data], axis=1)

        # Drop the original blue and red side rows
        batch = batch.drop(batch.index[[10, 11]])

        batches.append(batch)

    # print("done")
    print(GREEN + "✓ Finished merging rows." + RESET)
    return pd.concat(batches, ignore_index=True)


# add internationals/major region tourneys (Worlds, MSI, Demacia Cup, Kespa)
# Worlds = WLDs, kespa = KeSPA
def add_tourneys(data: pd.DataFrame, df: pd.DataFrame):
    add = ["WLDs", "MSI", "KeSPA", "DCup"]
    new_tourn = data[data["league"].isin(add)]

    filtered = new_tourn[df.columns]
    return pd.concat([df, filtered], ignore_index=True)


def add_calc_fields(data: pd.DataFrame):
    pass


def add_all(data: pd.DataFrame, yr: int):
    new_df = add_tourneys(data, filter_cols(data))
    new_df = add_bans(add_picks(new_df))  # add picks & bans
    new_df = fill_team_info(new_df)
    new_df = merge_rows(new_df)

    new_df.to_csv(f"./new_data2_{yr}.csv")


yr = 2014
data = pd.read_csv(f"./datasets/{yr}_data.csv")
add_all(data, yr)
# filter_cols(data).to_csv(f"./data/data_{yr}.csv")
