import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';
import * as socketIO from 'socket.io-client';

@Injectable()
export class AppService{
    public socket;
    constructor (private config:AppConfig){
       
    }

    init(){
        if(!this.socket){
            console.log(this.config.game_socket_url);
            this.socket = socketIO(this.config.game_socket_url); 

            this.socket.on('connect',()=>{
                console.log("connected");
            });
            this.socket.on('disconnect',()=>{
                console.log("disconnect");
            });
     }   
    }
}