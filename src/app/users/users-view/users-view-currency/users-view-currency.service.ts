import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/auth/auth.service';
import { UserCurrencyResult } from 'src/app/models/user-currency/user-currency-result.model';
import { UserCurrency } from 'src/app/models/user-currency/user-currency.model';

@Injectable({
    providedIn: 'root'
})
export class UsersViewCurrencyService {
    dataSubject = new Subject<UserCurrencyResult>();
    selectedData: UserCurrency;
    data: UserCurrency[];
    total_result: number;
    page: number = 1;
    total_page: number;
    constructor(private httpClient: HttpClient, private config: AppConfig, private authService: AuthService) { }
    httpOptions = new HttpHeaders({
        'Content-Type': "application/json",
        'mbn-access-token': this.authService.getToken()
    });
    loadHttpOptions() {
        this.httpOptions = new HttpHeaders({
            'Content-Type': "application/json",
            'mbn-access-token': this.authService.getToken()
        });
    }
    get(userId: string, user_currency_type: string, page?: number, q?: string) {
        this.loadHttpOptions();
        let get_url = "/user-currency/" + userId + "/";
        if (page) {
            get_url = get_url + page
        }
        if (q) {
            get_url += "?q=" + q;
        }



        return this.httpClient.get<UserCurrencyResult>(this.config.apiUrl + get_url, { headers: this.httpOptions });
    }
    submit(userId: string, data: UserCurrency) {
        this.loadHttpOptions();
        if (data._id != "" && data._id != null && data._id) {
            return this.update(userId, data);
        }
        return this.create(userId, data);
    }
    create(userId: string, data: UserCurrency) {
        this.loadHttpOptions();
        return this.httpClient.post<{ message: string, success: boolean }>(this.config.apiUrl + "/user-currency/" + userId, data, { headers: this.httpOptions });
    }

    update(userId: string, data: UserCurrency) {
        this.loadHttpOptions();
        return this.httpClient.put<{ message: string, success: boolean }>(this.config.apiUrl + "/user-currency/" + userId + "/" + data._id, data, { headers: this.httpOptions });
    }

    delete(data: UserCurrency) {
        this.loadHttpOptions();
        return this.httpClient.delete<{ success: boolean }>(this.config.apiUrl + "/user-currency/" + data._id, { headers: this.httpOptions });
    }

    getBalance(id) {
        this.loadHttpOptions();
        return this.httpClient.get<{ remaining: number, total_credit: number, total_debit: number }>(this.config.apiUrl + "/user-currency/remaining/" + id, { headers: this.httpOptions });
    }

    getItem(id: string, data: UserCurrency[]) {
        for (let item of data) {
            if (item._id == id) {
                return item;
            }
        }
        return new UserCurrency();
    }//end   

    updateItem(id: string, newdata: UserCurrency, items: UserCurrency[]) {
        var x = 0;
        for (let item of items) {
            if (item._id == id) {
                items[x] = newdata;
                break;
            }
            x++;
        }
        return items;
    }
}
