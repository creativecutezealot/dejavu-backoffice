import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { Games } from '../models/games/games.model';
import { GamesResult } from '../models/games/games-result.model';


@Injectable()
export class GamesService{
    dataSubject = new Subject<GamesResult>();
    reloadDataSubject = new Subject<null>();
    selectedData: Games;
    data: Games[];
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
    get(page?:number,filter_games?:Games){
        this.loadHttpOptions();
        let get_url = "/games/";
        if(page){
            get_url = get_url+page
        }
        var param_url="";
        if(filter_games.Season){
            param_url+=(param_url==""?"?":"&")+"season="+filter_games.Season;
        }
        if(filter_games.Status){
           param_url+=(param_url==""?"?":"&")+"status="+filter_games.Status;
        }
        if(filter_games.InningHalf){
            param_url+=(param_url==""?"?":"&")+"inning_half="+filter_games.InningHalf;
         }
         if(filter_games.Inning){
            param_url+=(param_url==""?"?":"&")+"inning="+filter_games.Inning;
         }
         if(filter_games.AwayTeam){
            param_url+=(param_url==""?"?":"&")+"away_team="+filter_games.AwayTeam;
         }
         if(filter_games.HomeTeam){
            param_url+=(param_url==""?"?":"&")+"home_team="+filter_games.HomeTeam;
         }
         if(filter_games.DateTime){

            param_url+=(param_url==""?"?":"&")+"date_time="+filter_games.DateTime;
         }
         
        get_url+=param_url;
        
       return this.httpClient.get<GamesResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
  
    getShow(id:string){
        return this.httpClient.get<Games>(this.config.apiUrl+"/games/show/"+id,{headers: this.httpOptions});
    }
    getBetsOverview(id:string){
        return this.httpClient.get(this.config.apiUrl+"/games/bets/overview/"+id,{headers: this.httpOptions});
    }

    getBetsWinLoseOverview(id:string){
        return this.httpClient.get(this.config.apiUrl+"/games/bets/overview/winlose/"+id,{headers: this.httpOptions});
    }

    getBetsPerPlaceWinLoseOverview(id:string){
        return this.httpClient.get(this.config.apiUrl+"/games/bets/overview/bets-per-place/"+id,{headers: this.httpOptions});
    }
    getAllTop(num){
        return this.httpClient.get<Games[]>(this.config.apiUrl+"/games/alltop/"+num,{headers: this.httpOptions});
    }
    getAllTopFromPlays(num){
        return this.httpClient.get<any>(this.config.apiUrl+"/games/alltopfromplays/"+num,{headers: this.httpOptions});
    }
    

    getItem(id:string,data: Games[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new Games();
    }//end   
    
  
}
