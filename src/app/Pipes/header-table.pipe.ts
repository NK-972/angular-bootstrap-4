import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headerTable'
})
export class HeaderTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.split('-$')[0];
  }

}