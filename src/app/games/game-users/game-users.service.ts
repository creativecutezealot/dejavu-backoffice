import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { GamesUsers } from 'src/app/models/games-users/games-users.model';
import { GamesUsersResult } from 'src/app/models/games-users/games-users-result.model';
@Injectable()

export class GameUsersService{
    dataSubject = new Subject<GamesUsersResult>();
    selectedData: GamesUsers;
    data: GamesUsers[];
    total_result:number;
    page:number = 1;
    total_page:number;
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
    get(game_id:string,page?:number,gamesUsers?:GamesUsers){
        this.loadHttpOptions();
        let get_url = "/games-users/"+game_id+"/";
        if(page){
            get_url = get_url+page
        }
        var param_url="";
        
        get_url += param_url;
        
       return this.httpClient.get<GamesUsersResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
   
  

}