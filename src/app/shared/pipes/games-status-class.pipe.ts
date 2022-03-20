import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gamesStatusClass'
})
export class GamesStatusClassPipe implements PipeTransform {

    transform(val: any, filter?: any): any {

        if (val == "Scheduled") {
            return "badge-primary";
        }
        if (val == "InProgress") {
            return "badge-warning";
        }
        if (val == "Final") {
            return "badge-success";
        }
        return "badge-danger";
    }

}
