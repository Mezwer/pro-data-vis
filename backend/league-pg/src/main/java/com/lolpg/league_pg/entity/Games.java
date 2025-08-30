package com.lolpg.league_pg.entity;

import java.time.LocalDate;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@Entity
@Table(name="games")
public class Games {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String gameid;
  private String datacompleteness;
  private String league;
  private Short year;
  private String split;
  private Short playoffs;
  private LocalDate date;
  private Short game;
  private Double patch;
  private String side;
  private String position;

  private String playername;
  private String teamname;
  private String champion;
  private Short gamelength;
  private Short result;

  private Short kills;
  private Short deaths;
  private Short assists;

  private Double doublekills;
  private Double triplekills;
  private Double quadrakills;
  private Double pentakills;
  private Double firstbloodkill;
  private Double firstbloodvictim;
  private Double ckpm;
  private Integer damagetochampions;
  private Double dpm;
  private Double damageshare;
  private Double damagetakenperminute;
  private Double damagemitigatedperminute;
  private Double wardsplaced;
  private Double wpm;
  private Double wardskilled;
  private Double wcpm;
  private Double controlwardsbought;
  private Double visionscore;
  private Double vspm;
  private Integer totalgold;
  private Double earnedgold;
  private Double earned_gpm;
  private Double earnedgoldshare;
  private Double goldspent;
  private Double total_cs;
  private Double minionkills;
  private Double monsterkills;
  private Double cspm;
  private Double golddiffat10;
  private Double xpdiffat10;
  private Double csdiffat10;
  private Double killsat10;
  private Double assistsat10;
  private Double deathsat10;
  private Double golddiffat15;
  private Double xpdiffat15;
  private Double csdiffat15;
  private Double killsat15;
  private Double assistsat15;
  private Double deathsat15;
  private Double golddiffat20;
  private Double xpdiffat20;
  private Double csdiffat20;
  private Double killsat20;
  private Double assistsat20;
  private Double deathsat20;
  private Double golddiffat25;
  private Double xpdiffat25;
  private Double csdiffat25;
  private Double killsat25;
  private Double assistsat25;
  private Double deathsat25;

  private String blue_pick1;
  private String blue_pick2;
  private String blue_pick3;
  private String blue_pick4;
  private String blue_pick5;
  private String red_pick1;
  private String red_pick2;
  private String red_pick3;
  private String red_pick4;
  private String red_pick5;

  private String blue_ban1;
  private String blue_ban2;
  private String blue_ban3;
  private String blue_ban4;
  private String blue_ban5;
  private String red_ban1;
  private String red_ban2;
  private String red_ban3;
  private String red_ban4;
  private String red_ban5;

  private String opp_teamname;
  private Double opp_kills;
  private Double opp_deaths;
  private Double opp_assists;
  private Double opp_doublekills;
  private Double opp_triplekills;
  private Double opp_quadrakills;
  private Double opp_pentakills;
  private Double opp_ckpm;
  private Double opp_damagetochampions;
  private Double opp_dpm;
  private Double opp_damagetakenperminute;
  private Double opp_damagemitigatedperminute;
  private Double opp_wardsplaced;
  private Double opp_wpm;
  private Double opp_wardskilled;
  private Double opp_wcpm;
  private Double opp_controlwardsbought;
  private Double opp_visionscore;
  private Double opp_vspm;
  private Double opp_totalgold;
  private Double opp_earnedgold;
  private Double opp_earned_gpm;
  private Double opp_goldspent;
  private Double opp_minionkills;
  private Double opp_monsterkills;
  private Double opp_cspm;
  private Double opp_golddiffat10;
  private Double opp_xpdiffat10;
  private Double opp_csdiffat10;
  private Double opp_killsat10;
  private Double opp_assistsat10;
  private Double opp_deathsat10;
  private Double opp_golddiffat15;
  private Double opp_xpdiffat15;
  private Double opp_csdiffat15;
  private Double opp_killsat15;
  private Double opp_assistsat15;
  private Double opp_deathsat15;
  private Double opp_golddiffat20;
  private Double opp_xpdiffat20;
  private Double opp_csdiffat20;
  private Double opp_killsat20;
  private Double opp_assistsat20;
  private Double opp_deathsat20;
  private Double opp_golddiffat25;
  private Double opp_xpdiffat25;
  private Double opp_csdiffat25;
  private Double opp_killsat25;
  private Double opp_assistsat25;
  private Double opp_deathsat25;
}
