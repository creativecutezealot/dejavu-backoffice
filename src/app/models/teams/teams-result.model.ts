import { Teams } from './teams.model';

export class TeamsResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: Teams[];

    constructor(total_result: number, total_page: number, page: number, data: Teams[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}