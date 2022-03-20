import { Games } from './games.model';

export class GamesResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: Games[];

    constructor(total_result: number, total_page: number, page: number, data: Games[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}