import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any = {}, asc: boolean = false, ...args: any[]): any {
    if (!value.sort) {
      throw new Error('Data is unsortable');
    }
    return value.sort((a: { date: any }, b: { date: any }) => {
      return asc ? (Number(new Date(b.date)) - Number(new Date(a.date))) : (Number(new Date(a.date)) - Number(new Date(b.date)));
    });
  }

}
