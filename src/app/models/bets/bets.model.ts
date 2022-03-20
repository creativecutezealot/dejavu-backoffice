import { User } from '../user.model';

export class Bets{
    public _id: string;
    public user: User;
    public place: string;
    public amount: number;
    public status: number; // Pending
    public win: boolean; 
    public innings: number;
    public last_selected_chip:number;
    public isPassLine: boolean;
    public created_at: Date;
    public updated_at: Date;
}