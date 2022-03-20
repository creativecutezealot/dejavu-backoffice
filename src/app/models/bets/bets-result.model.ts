import { Bets } from './bets.model';

export class BetsResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: Bets[];

    constructor(total_result: number, total_page: number, page: number, data: Bets[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}