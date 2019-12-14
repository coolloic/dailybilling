import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, locale: string = 'en-US', ...args: any[]): any {
    if (!this.isDate(value)) {
      throw new Error('Invalid Date');
    }
    return new Date(value).toLocaleDateString(locale);
  }

  private isDate(date: any) {
    // @ts-ignore
    return (new Date(date) !== 'Invalid Date') && !isNaN(new Date(date));
  }

}
