import { User } from '../user.model';
import { Games } from '../games/games.model';

export class GamesUsers {
    public _id: string;
    public user: User;
    public games: Games;
    public status: number; //0 in progress 2 completed 3 cancelled
    public max_pass_line_bets: number;
    public total_last_passline: number;
    public total_win: number;
    public total_lose: number;
    public created_at: Date;
    public updated_at: Date;
}