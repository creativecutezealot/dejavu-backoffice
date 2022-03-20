import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { TopPlayersResult } from '../models/dashboard/top-players-result.model';



@Injectable()
export class DashboardService{
    
    constructor(private httpClient:HttpClient,private config: AppConfig,private authService: AuthService){}
    httpOptions = new HttpHeaders({
        'Content-Type':"application/json",
        'mbn-access-token':this.authService.getToken()
    });
    loadHttpOptions(){
       this.httpOptions = new HttpHeaders({
            'Content-Type':"application/json",
            'mbn-access-token':this.authService.getToken()
        });
    }
    getNumberPlayers(){
        this.loadHttpOptions();
        return this.httpClient.get<{total_users:number}>(this.config.apiUrl+"/dashboard/total-users",{headers: this.httpOptions});
    }

    getTotalWinLoseOverview(){
        this.loadHttpOptions();
        return this.httpClient.get<{total_win:number,total_lose:number}>(this.config.apiUrl+"/dashboard/total-win-lose",{headers: this.httpOptions})
    }

    getTopPlayers(){
        this.loadHttpOptions();
        return this.httpClient.get<{success:boolean,data:TopPlayersResult[]}>(this.config.apiUrl+"/dashboard/top-players",{headers: this.httpOptions})
    }

    getBetsOverview(){
        this.loadHttpOptions();
        return this.httpClient.get<any>(this.config.apiUrl+"/dashboard/bets-overview",{headers: this.httpOptions})
    }

    getBetsCountOverview(){
        this.loadHttpOptions();
        return this.httpClient.get<any>(this.config.apiUrl+"/dashboard/top-bets-count",{headers: this.httpOptions})
    }
    
  


}