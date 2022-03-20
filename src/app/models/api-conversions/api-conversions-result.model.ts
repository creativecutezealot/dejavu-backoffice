import { ApiConversions } from './api-conversions.model';

export class ApiConversionsResult{
    public total_result: number;
    public total_page: number;
    public page: number;
    public data: ApiConversions[];

    constructor(total_result: number, total_page: number, page: number, data: ApiConversions[]) {
        this.total_result = total_result;
        this.total_page = total_page;
        this.page = page;
        this.data = data;
    }
    
}