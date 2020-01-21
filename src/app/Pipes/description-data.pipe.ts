import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionData'
})
export class DescriptionDataPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return value.split('¤')[args];
  }

}