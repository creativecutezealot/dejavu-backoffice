import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
export class AppConfig {
    public socketDebug: string = environment.socketDebug;
    public host: string = environment.host;
    public protocol: string = environment.protocol;
    public version: string = environment.version;
    public port: string = environment.port;
    public apiUrl: string = "";
    public socketUrl: string = "";
    public game_host: string = environment.game_host;
    public game_port: string = environment.game_port;
    public game_socket_url: string = "";
    public httpOptions = new HttpHeaders({
        'Content-Type': "application/json"
    });

    constructor() {
        this.socketDebug = environment.socketDebug;
        localStorage.setItem("debug", this.socketDebug);

        if (environment.production == true) {
            this.apiUrl = this.protocol + "://" + this.host + "/" + this.version;
            this.socketUrl = this.protocol + "://" + this.host;
            this.game_socket_url = this.protocol + "://" + this.game_host;
        } else {
            if (this.port != "") {
                this.apiUrl = this.protocol + "://" + this.host + ":" + this.port + "/" + this.version
                this.socketUrl = this.protocol + "://" + this.host + ":" + this.port;
                this.game_socket_url = this.protocol + "://" + this.game_host + ":" + this.game_port;
            } else {
                this.apiUrl = this.protocol + "://" + this.host + "/" + this.version;
                this.socketUrl = this.protocol + "://" + this.host + ":" + this.port
                this.game_socket_url = this.protocol + "://" + this.game_host + ":" + this.game_port;
            }
        }
    }
}