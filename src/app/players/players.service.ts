import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { Players } from '../models/players/players.model';
import { PlayersResult } from '../models/players/players-result.model';



@Injectable({
    providedIn: 'root'
})
export class PlayersService {

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
    get(page?: number, q?: string) {
        this.loadHttpOptions();
        let get_url = "/players/";
        if (page) {
            get_url = get_url + page
        }
        if (q) {
            get_url += "?q=" + q;
        }

        return this.httpClient.get<PlayersResult>(this.config.apiUrl + get_url, { headers: this.httpOptions });
    }

    getAll() {
        this.loadHttpOptions();
        return this.httpClient.get<Players[]>(this.config.apiUrl + "/players/all", { headers: this.httpOptions });
    }
    resync() {
        this.loadHttpOptions();
        return this.httpClient.post<{ message: String, success: boolean }>(this.config.apiUrl + "/players/resync", [], { headers: this.httpOptions });
    }

    getItem(id: string, data: Players[]) {
        for (let item of data) {
            if (item._id == id) {
                return item;
            }
        }
        return new Players();
    }//end   

    saveItem(data) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/player/save-player", data, { headers: this.httpOptions });
    }

    deleteItem(team_id) {
        this.loadHttpOptions();
        return this.httpClient.delete(this.config.apiUrl + "/player/remove-player?player_id=" + team_id, { headers: this.httpOptions })
    }

    updateItem(data) {
        this.loadHttpOptions();
        return this.httpClient.post(this.config.apiUrl + "/player/update-player", data, { headers: this.httpOptions });
    }



}
