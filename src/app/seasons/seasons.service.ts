import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { Seasons } from '../models/seasons/seasons.model';
import { SeasonsResult } from '../models/seasons/seasons-result.model';


@Injectable()
export class SeasonsService{
    dataSubject = new Subject<SeasonsResult>();
    selectedData: Seasons;
    data: Seasons[];
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
    get(page?:number,q?:string){
        this.loadHttpOptions();
        let get_url = "/seasons/";
        if(page){
            get_url = get_url+page
        }
        if(q){
            get_url+="?q="+q;
        }
        
       return this.httpClient.get<SeasonsResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
  

    getItem(id:string,data: Seasons[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new Seasons();
    }//end   
    
  
}
