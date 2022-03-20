import { UsersBalance } from './users-balance.model';

export class UsersBalanceResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: UsersBalance[];

    constructor(total_result: number, total_page: number, page: number, data: UsersBalance[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}