import { Seasons } from './seasons.model';

export class SeasonsResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: Seasons[];

    constructor(total_result: number, total_page: number, page: number, data: Seasons[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}