import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mergeAmountByDate'
})
export class MergeAmountByDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const entrySet = {};
    value.map((d: any) => {
      // calc same date amount
      const amount = entrySet[d.date] ? (entrySet[d.date].amount = (entrySet[d.date].amount + d.amount)) : d.amount;
      entrySet[d.date] = Object.assign({...d}, {amount});
    });
    return Object.values(entrySet);
  }
}
