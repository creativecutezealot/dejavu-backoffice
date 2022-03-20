import { Injectable } from '@angular/core';
import {Alert} from './../models/alert.model';
import { Subject } from 'rxjs';
@Injectable()
export class CoreService{
     alert:Alert;
     loading: boolean;
     showAlert:boolean;
     showAlertInline:boolean = true;
     isLoadingSubject = new Subject<boolean>();
     clearTimeOut;
    constructor() {
        this.alert = new Alert();
    }
    public closeAlert(){
        this.showAlert = false;
        this.showAlertInline = true;
    }
    public setAutoCloseAlert(){
        this.clearTimeOut = setTimeout(()=>{
            this.closeAlert();
        },5000);
    }

    public showAlertAutoClose(type?:string,message?:string){
        this.showAlert = true;
        this.alert.type = type;
        this.alert.message = message;
        this.setAutoCloseAlert();
    }

}