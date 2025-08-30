package com.lolpg.league_pg.controllers;

import com.lolpg.league_pg.entity.Games;
import com.lolpg.league_pg.repositories.GameRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<Games> getPlayerGames(@RequestParam(required = true) String playername) {
        long start = System.currentTimeMillis();

        List<Games> games;
        games = gameRepository.findByPlayername(playername);

        long end = System.currentTimeMillis();
        System.out.println("Execution time: " + (end - start) + " ms");

        return games;
    }

    @GetMapping("/id")
    public List<Games> getGames(@RequestParam(required = true) String gameid) {
        List<Games> games = gameRepository.findByGameid(gameid);
        return games;
    }

    @GetMapping("/all")
    public List<Games> getAll() {
        long start = System.currentTimeMillis();

        List<Games> games;
        games = gameRepository.findTop1000By();

        long end = System.currentTimeMillis();
        System.out.println("Execution time: " + (end - start) + " ms");

        return games;
    }
}
