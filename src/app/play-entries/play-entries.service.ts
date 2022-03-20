import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { Players } from '../models/players/players.model';
import { PlayersResult } from '../models/players/players-result.model';
import { GameSchedule } from '../models/play-entries/game-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class PlayEntriesService {

  dataSubject = new Subject<PlayersResult>();
  selectedData: Players;
  data: Players[];
  total_result: number;
  page: number = 1;
  total_page: number;
  constructor(private httpClient: HttpClient, private config: AppConfig, private authService: AuthService) { }
  httpOptions = new HttpHeaders({
    'Content-Type': "application/json",
    'mbn-access-token': this.authService.getToken()
  });
  loadHttpOptions() {
    this.httpOptions = new HttpHeaders({
      'Content-Type': "application/json",
      'mbn-access-token': this.authService.getToken()
    });
  }

  saveGame(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/save-game-schedule", data, { headers: this.httpOptions });
  }

  updateGame(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/update-game-schedule", data, { headers: this.httpOptions });
  }

  getGameSchedules(page?:number, userId?:string, role?:number) {
    this.loadHttpOptions();
    let getUrl = "/play-entry/get-game-schedules/"
    var params = ""
    if(page) {
      getUrl += page
    }

    if(role && userId) {
      getUrl+= '?role='+role+'&user_id='+userId
    }
    return this.httpClient.get<GameSchedule>(this.config.apiUrl + getUrl, { headers: this.httpOptions })
  }

  getTeams() {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/teams/all", {headers: this.httpOptions});
  }

  getSingleGameSchedule(id) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/play-entry?schedule_id="+id, {headers: this.httpOptions});
  }

  getTeamPlayers(awayTeamId, homeTeamId) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/get-team-player?away_team_id="+awayTeamId+"&home_team_id="+homeTeamId, {headers: this.httpOptions});
  }

  saveBatter(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/save-batter", data, { headers: this.httpOptions });
  }

  updateBatter(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/update-batter", data, { headers: this.httpOptions });
  }

  getBatter(gameId) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/play-entry/get-batters?game_id="+gameId, { headers: this.httpOptions })
  }

  saveGamePlay(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/save-game-play", data, { headers: this.httpOptions });
  }
  
  savePlayByPlay(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/save-playbyplay", data, { headers: this.httpOptions });
  }

  getGamePlay(gameId) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/play-entry/get-game-play?game_id="+gameId, { headers: this.httpOptions })
  }

  getPlayByPlay(gameId) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/play-entry/get-playbyplay?game_id="+gameId, { headers: this.httpOptions })
  }

  deleteBatter(batterId) {
    this.loadHttpOptions();
    return this.httpClient.delete(this.config.apiUrl+"/play-entry/remove-batter?batter_id="+batterId, { headers: this.httpOptions })
  }

  moveBatterUpdate(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl+"/play-entry/move-batter", data, { headers: this.httpOptions })
  }

  deleteGameSchedule(game_id) {
    this.loadHttpOptions();
    return this.httpClient.delete(this.config.apiUrl+"/play-entry/game-schedule?game_id="+game_id, { headers: this.httpOptions })
  }

  getOperators() {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/get-operators", { headers: this.httpOptions })
  }

  getGameCache(gameId) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/get-game-cache?game_id="+gameId, { headers: this.httpOptions })
  }

  postUndo(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl+"/play-entry/undo", data, { headers: this.httpOptions })
  }

  getLineUps(team_id) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/team/get-lineups?team_id=" + team_id, { headers: this.httpOptions });
  }

  getLineUpPlayers(lineup_id) {
      this.loadHttpOptions();
      return this.httpClient.get(this.config.apiUrl + "/team/get-lineup-players?lineup_id=" + lineup_id, { headers: this.httpOptions });
  }

  savePitcher(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/save-pitcher", data, { headers: this.httpOptions });
  }

  updatePitcher(data) {
    this.loadHttpOptions();
    return this.httpClient.post(this.config.apiUrl + "/play-entry/update-pitcher", data, { headers: this.httpOptions });
  }

  getPitchers(gameId) {
    this.loadHttpOptions();
    return this.httpClient.get(this.config.apiUrl + "/play-entry/get-pitchers?game_id="+gameId, { headers: this.httpOptions })
  }

  deletePitcher(pitcherId) {
    this.loadHttpOptions();
    return this.httpClient.delete(this.config.apiUrl+"/play-entry/remove-pitcher?pitcher_id="+pitcherId, { headers: this.httpOptions })
  }

}
