import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { Teams } from '../models/teams/teams.model';
import { TeamsResult } from '../models/teams/teams-result.model';


@Injectable()
export class TeamsService {
    dataSubject = new Subject<TeamsResult>();
    selectedData: Teams;
    data: Teams[];
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
    get(page?: number, q?: string) {
        this.loadHttpOptions();
        let get_url = "/teams/";
        if (page) {
            get_url = get_url + page
        }
        if (q) {
            get_url += "?q=" + q;
        }

        return this.httpClient.get<TeamsResult>(this.config.apiUrl + get_url, { headers: this.httpOptions });
    }

    getAll() {
        this.loadHttpOptions();
        return this.httpClient.get<Teams[]>(this.config.apiUrl + "/teams/all", { headers: this.httpOptions });
    }
    resync() {
        this.loadHttpOptions();
        return this.httpClient.post<{ message: String, success: boolean }>(this.config.apiUrl + "/teams/resync", [], { headers: this.httpOptions });
    }

    getItem(id: string, data: Teams[]) {
        for (let item of data) {
            if (item._id == id) {
                return item;
            }
        }
        return new Teams();
    }//end   

    saveTeam(data) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/team/save-team", data, { headers: this.httpOptions });
    }

    deleteTeam(team_id) {
        this.loadHttpOptions();
        return this.httpClient.delete(this.config.apiUrl + "/team?team_id=" + team_id, { headers: this.httpOptions })
    }

    updateTeam(data) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/team/update-team", data, { headers: this.httpOptions });
    }

    createLineup(data) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/team/save-lineup", data, { headers: this.httpOptions });
    }

    getLineUps(team_id) {
        this.loadHttpOptions();
        return this.httpClient.get(this.config.apiUrl + "/team/get-lineups?team_id=" + team_id, { headers: this.httpOptions });
    }

    getTeamPlayers(team_id) {
        this.loadHttpOptions();
        return this.httpClient.get(this.config.apiUrl + "/team/get-players?team_id=" + team_id, { headers: this.httpOptions });
    }

    addToLineUp(lineup_id, player_id) {
        let data = {
            lineup_id: lineup_id,
            player_id: player_id
        }
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/team/save-lineup-player", data, { headers: this.httpOptions });
    }

    getLineUpPlayers(lineup_id) {
        this.loadHttpOptions();
        return this.httpClient.get(this.config.apiUrl + "/team/get-lineup-players?lineup_id=" + lineup_id, { headers: this.httpOptions });
    }

    deleteLineup(lineup_id) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/team/delete-lineup", {lineup_id: lineup_id}, { headers: this.httpOptions });
    }

    deleteLineupPlayer(id) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/team/delete-lineup-player", {id: id}, { headers: this.httpOptions });
    }


}
