import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { CurrencyTypeResult } from 'src/app/models/currency-type/currency-type-result.model';
import { CurrencyType } from 'src/app/models/currency-type/currency-type.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTypeService {

  dataSubject = new Subject<CurrencyTypeResult>();
  selectedData: CurrencyType;
  data: CurrencyType[];
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
      let get_url = "/user-currency-type/";
      if(page){
          get_url = get_url+page
      }
      if(q){
          get_url+="?q="+q;
      }
      
     return this.httpClient.get<CurrencyTypeResult>(this.config.apiUrl+get_url,{headers: this.httpOptions});
  }
  submit(data: CurrencyType){
      this.loadHttpOptions();
      if(data._id!="" && data._id!=null && data._id){
          return this.update(data);
      }
      return this.create(data);
  }
  create(data: CurrencyType){
      this.loadHttpOptions();
      return this.httpClient.post<{message: string, status: boolean}>(this.config.apiUrl+"/user-currency-type/",data,{headers: this.httpOptions});   
  }

  update(data: CurrencyType){
      this.loadHttpOptions();
      return this.httpClient.put<{message: string, status: boolean}>(this.config.apiUrl+"/user-currency-type/"+data._id,data,{headers: this.httpOptions});   
  }

  delete(data: CurrencyType){
      this.loadHttpOptions();
      
      return this.httpClient.delete<{message: string, status: boolean}>(this.config.apiUrl+"/user-currency-type/delete/"+data._id,{headers: this.httpOptions});   
  }
  acrhive(data: CurrencyType){
    this.loadHttpOptions();
    
    return this.httpClient.delete<{message: string, status: boolean}>(this.config.apiUrl+"/user-currency-type/archive/"+data._id,{headers: this.httpOptions});   
}


  getItem(id:string,data: CurrencyType[]){
      for(let item of data){
          if(item._id==id){
              return item;
          }
      }
      return new CurrencyType();
  }//end   
  
  updateItem(id:string,newdata: CurrencyType, items: CurrencyType[]){
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
