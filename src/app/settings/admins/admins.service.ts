import { Injectable } from '@angular/core';
import { AdminsResult } from 'src/app/models/admins/admins-result.model';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AdminsService{
    dataSubject = new Subject<AdminsResult>();
    selectedData: User;
    data: User[];
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
        let get_url = "/admins/";
        if(page){
            get_url = get_url+page
        }
        if(q){
            get_url+="?q="+q;
        }
        
       return this.httpClient.get<AdminsResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
    submit(data: User){
        this.loadHttpOptions();
        if(data._id!="" && data._id!=null && data._id){
            return this.update(data);
        }
        return this.create(data);
    }
    create(data: User){
        this.loadHttpOptions();
        return this.httpClient.post<{message:string,success:boolean}>(this.config.apiUrl+"/admins/",data,{headers: this.httpOptions});   
    }

    update(data: User){
        this.loadHttpOptions();
        return this.httpClient.put<{message:string,success:boolean}>(this.config.apiUrl+"/admins/"+data._id,data,{headers: this.httpOptions});   
    }

    delete(data: User){
        this.loadHttpOptions();
        return this.httpClient.delete<{success:boolean}>(this.config.apiUrl+"/admins/"+data._id,{headers: this.httpOptions});   
    }


    getItem(id:string,data: User[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new User();
    }//end   
    
    updateItem(id:string,newdata: User, items: User[]){
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