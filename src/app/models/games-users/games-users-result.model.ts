import { GamesUsers } from './games-users.model';

export class GamesUsersResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: GamesUsers[];

    constructor(total_result: number, total_page: number, page: number, data: GamesUsers[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}