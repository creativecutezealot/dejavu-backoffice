import { UserCurrency } from './user-currency.model';

export class UserCurrencyResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: UserCurrency[];

    constructor(total_result: number, total_page: number, page: number, data: UserCurrency[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}