import { Plays } from './plays.model';


export class PlaysResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: Plays[];

    constructor(total_result: number, total_page: number, page: number, data: Plays[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}