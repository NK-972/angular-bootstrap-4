import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findInColumn'
})
export class FindInColumnPipe implements PipeTransform {
  transform(row: any, column: string, searchText: string) {

    return row.filter(e => e[column].indexOf(searchText) !== -1);
  }
}