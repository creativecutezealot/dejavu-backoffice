import { User } from '../user.model';

export class UsersBalance{
    public _id: string;
    public user: User;
    public type: number; // Transaction Type 1 credit 2 debit
    public description: string;
    public amount: number;
    public result:string;
    //public PlayID: {type: Schema.Types.ObjectId, ref: 'Plays'},
    public created_at: Date;
    public updated_at: Date;
}