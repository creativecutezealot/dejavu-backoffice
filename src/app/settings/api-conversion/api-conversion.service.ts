import { Injectable } from '@angular/core';
import { ApiConversions } from 'src/app/models/api-conversions/api-conversions.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiConversionsResult } from 'src/app/models/api-conversions/api-conversions-result.model';

@Injectable()
export class ApiConversionService{
    dataSubject = new Subject<ApiConversionsResult>();
    selectedData: ApiConversions;
    data: ApiConversions[];
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
        let get_url = "/api-conversions/";
        if(page){
            get_url = get_url+page
        }
        if(q){
            get_url+="?q="+q;
        }
        
       return this.httpClient.get<ApiConversionsResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
    }
    submit(data: ApiConversions){
        this.loadHttpOptions();
        if(data._id!="" && data._id!=null && data._id){
            return this.update(data);
        }
        return this.create(data);
    }
    create(data: ApiConversions){
        this.loadHttpOptions();
        return this.httpClient.post<ApiConversions>(this.config.apiUrl+"/api-conversions/",data,{headers: this.httpOptions});   
    }

    update(data: ApiConversions){
        this.loadHttpOptions();
        return this.httpClient.put<ApiConversions>(this.config.apiUrl+"/api-conversions/"+data._id,data,{headers: this.httpOptions});   
    }

    delete(data: ApiConversions){
        this.loadHttpOptions();
        return this.httpClient.delete<{success:boolean}>(this.config.apiUrl+"/api-conversions/"+data._id,{headers: this.httpOptions});   
    }


    getItem(id:string,data: ApiConversions[]){
        for(let item of data){
            if(item._id==id){
                return item;
            }
        }
        return new ApiConversions();
    }//end   
    
    updateItem(id:string,newdata: ApiConversions, items: ApiConversions[]){
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