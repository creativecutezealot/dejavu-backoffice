import { Injectable } from '@angular/core';
import { UsersGamesResult } from '../../../models/users-games/users-games-result.model';
import { Subject } from 'rxjs';
import { UsersGames } from '../../../models/users-games/users-games.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable()

export class UsersViewGamesPlayedService{
    dataSubject = new Subject<UsersGamesResult>();
    selectedData: UsersGames;
    data: UsersGames[];
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
    get(userId:string,page?:number,q?:string){
        this.loadHttpOptions();
        let get_url = "/users-games/"+userId+"/";
        if(page){
            get_url = get_url+page
        }
        if(q){
            get_url+="?q="+q;
        }
        
       return this.httpClient.get<UsersGamesResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
   

 
    getOverview(id){
        this.loadHttpOptions();
        return this.httpClient.get<{total_win:number,total_lose:number}>(this.config.apiUrl+"/users-games/overview/"+id,{headers: this.httpOptions});
     
    }

    getItem(id:string,data: UsersGames[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new UsersGames();
    }//end   
    
    updateItem(id:string,newdata: UsersGames, items: UsersGames[]){
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