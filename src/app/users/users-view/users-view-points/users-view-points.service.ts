import { Injectable } from '@angular/core';
import { UsersBalanceResult } from 'src/app/models/users-balance/users-balance-result.model';
import { Subject } from 'rxjs';
import { UsersBalance } from 'src/app/models/users-balance/users-balance.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from 'src/app/app-service';
@Injectable()

export class UsersViewPointsService{
    dataSubject = new Subject<UsersBalanceResult>();
    selectedData: UsersBalance;
    data: UsersBalance[];
    total_result:number;
    page:number = 1;
    total_page:number;
    constructor(private httpClient:HttpClient,private config: AppConfig,private authService: AuthService,private appService:AppService){}
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
        let get_url = "/users-balance/"+userId+"/";
        if(page){
            get_url = get_url+page
        }
        if(q){
            get_url+="?q="+q;
        }

      
        
       return this.httpClient.get<UsersBalanceResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
    submit(userId:string,data: UsersBalance){
        this.loadHttpOptions();
        if(data._id!="" && data._id!=null && data._id){
            return this.update(userId,data);
        }
        return this.create(userId,data);
    }
    create(userId:string,data: UsersBalance){
        this.loadHttpOptions();
        return this.httpClient.post<{message:string,success:boolean}>(this.config.apiUrl+"/users-balance/"+userId,data,{headers: this.httpOptions});   
    }

    update(userId:string,data: UsersBalance){
        this.loadHttpOptions();
        return this.httpClient.put<{message:string,success:boolean}>(this.config.apiUrl+"/users-balance/"+userId+"/"+data._id,data,{headers: this.httpOptions});   
    }

    delete(data: UsersBalance){
        this.loadHttpOptions();
        return this.httpClient.delete<{success:boolean}>(this.config.apiUrl+"/users-balance/"+data._id,{headers: this.httpOptions});   
    }
   
    getBalance(id){
        this.loadHttpOptions();
        return this.httpClient.get<{remaining:number,total_credit:number,total_debit:number}>(this.config.apiUrl+"/users-balance/remaining/"+id,{headers: this.httpOptions});
    }

    getItem(id:string,data: UsersBalance[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new UsersBalance();
    }//end   
    
    updateItem(id:string,newdata: UsersBalance, items: UsersBalance[]){
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