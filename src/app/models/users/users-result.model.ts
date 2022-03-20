import { User } from '../user.model';

export class UsersResult {
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: User[];

    constructor(total_result: number, total_page: number, page: number, data: User[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}