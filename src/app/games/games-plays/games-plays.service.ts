import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { Plays } from 'src/app/models/plays/plays.model';
import { PlaysResult } from 'src/app/models/plays/plays-result.model';
@Injectable()

export class GamePlaysService{
    dataSubject = new Subject<PlaysResult>();
    selectedData: Plays;
    data: Plays[];
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
    get(game_id:string,page?:number,plays?:Plays){
        this.loadHttpOptions();
        let get_url = "/games-plays/"+game_id+"/";
        if(page){
            get_url = get_url+page
        }
        var param_url="";
        if(plays.InningNumber){
            param_url+=(param_url==""?"?":"&")+"inning="+plays.InningNumber;
        }
        if(plays.InningHalf){
            param_url+=(param_url==""?"?":"&")+"inning_half="+plays.InningHalf;
        }
       
        get_url += param_url;
        
       return this.httpClient.get<PlaysResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
    

    
   
    getLastPlay(game_id:string){
        this.loadHttpOptions();
        return this.httpClient.get<Plays>(this.config.apiUrl+"/games-plays/lastplay/"+game_id,{headers: this.httpOptions});   
    }

    getAll(game_id:string){
        this.loadHttpOptions();
        //console.log(this.config.apiUrl+"/games-plays/all/"+game_id);
        return this.httpClient.get<Plays[]>(this.config.apiUrl+"/games-plays/all/"+game_id,{headers: this.httpOptions});   
    }
    
    getItem(id:string,data: Plays[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new Plays();
    }//end   
    
    updateItem(id:string,newdata: Plays, items: Plays[]){
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