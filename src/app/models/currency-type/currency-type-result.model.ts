import { CurrencyType } from './currency-type.model';

export class CurrencyTypeResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: CurrencyType[];

    constructor(total_result: number, total_page: number, page: number, data: CurrencyType[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}