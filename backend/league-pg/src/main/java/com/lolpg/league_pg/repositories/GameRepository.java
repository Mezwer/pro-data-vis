package com.lolpg.league_pg.repositories;

import com.lolpg.league_pg.entity.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameRepository extends JpaRepository<Games, Long> {
    List<Games> findByPlayername(String playername);
    List<Games> findByGameid(String gameid);
    List<Games> findTop1000By();
}
