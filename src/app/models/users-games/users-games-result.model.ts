import { Games } from '../games/games.model';
import { UsersGames } from './users-games.model';

export class UsersGamesResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: UsersGames[];

    constructor(total_result: number, total_page: number, page: number, data: UsersGames[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}