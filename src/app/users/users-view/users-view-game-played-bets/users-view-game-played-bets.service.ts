import { Injectable } from '@angular/core';
import { BetsResult } from '../../../models/bets/bets-result.model';
import { Subject } from 'rxjs';
import { Bets } from '../../../models/bets/bets.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable()

export class UsersViewGamePlayedBetsService{
    dataSubject = new Subject<BetsResult>();
    selectedData: Bets;
    data: Bets[];
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
    get(userId:string,game_table_id,page?:number,place?:string,passline?:string,win?:string){
        this.loadHttpOptions();
        let get_url = "/users-games-bets/"+userId+"/"+game_table_id+"/";
        if(page){
            get_url = get_url+page
        }
        var param_url="";
        if(place){
            param_url+=(param_url==""?"?":"&")+"place="+place;
        }
        if(passline){
            param_url+=(param_url==""?"?":"&")+"passline="+passline;
        }
        if(win){
            param_url+=(param_url==""?"?":"&")+"win="+win;
        }
        get_url += param_url;
        
       return this.httpClient.get<BetsResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
  
  
    getOverview(id,game_table_id,place?:string,passline?:string,win?:string){
        this.loadHttpOptions();
        var get_url = this.config.apiUrl+"/users-games-bets/overview/"+id+"/"+game_table_id
        var param_url="";
        if(place){
            param_url+=(param_url==""?"?":"&")+"place="+place;
        }
        if(passline){
            param_url+=(param_url==""?"?":"&")+"passline="+passline;
        }
        if(win){
            param_url+=(param_url==""?"?":"&")+"win="+win;
        }
        get_url += param_url;
        return this.httpClient.get<{total_win:number,total_lose:number}>(get_url,{headers: this.httpOptions});
    }

    getItem(id:string,data: Bets[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new Bets();
    }//end   
    
    updateItem(id:string,newdata: Bets, items: Bets[]){
        var x = 0;
        for(let item of items){
            if(item._id==id){
               items[x] = newdata;
               break;
            }
            x++;
        }
        return items;
    }  
}