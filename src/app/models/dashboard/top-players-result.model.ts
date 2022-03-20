import { User } from '../user.model';

export class TopPlayersResult{
    public _id:string;
    public total:number;
    public user:User;
}