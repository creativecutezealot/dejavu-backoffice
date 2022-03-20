import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';

import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class AuthService{

    
    token: string=null;
     respObject = {
        message:'',
        token:'',
        success:false,
        auth: false,
    }
    public userSubject = new Subject<User>();
    

    user:User;
    constructor(private httpClient:HttpClient,private config:AppConfig,private router: Router){}

    siginInUser(email: string, password: string){
        const httpOptions = new HttpHeaders({
            'Content-Type':"application/json"
        });
       return this.httpClient.post(this.config.apiUrl+"/auth/signin",{'email':email,'password':password},{'headers':httpOptions})
    }

    me(){
        const httpOptions = new HttpHeaders({
            'Content-Type':"application/json",
            'mbn-access-token':this.getToken()
        });
        return this.httpClient.get<User>(this.config.apiUrl+"/me",{headers:httpOptions});
    }

    signOutUser(){
        localStorage.clear();
        this.router.navigate(["/signin"]);
        this.token = null;
    }

    getToken(){
        return localStorage.getItem("token");
    }

    isAuthenticated(){
        this.token = localStorage.getItem("token");
        return  this.token!=null && this.token!=""; 
    }

}