import { Players } from './players.model';

export class PlayersResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: Players[];

    constructor(total_result: number, total_page: number, page: number, data: Players[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}