import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(val: any, filter?: any): any {
    
    if(val==1){
        return "Credit"
    }
    return "Debit";
  }

}
