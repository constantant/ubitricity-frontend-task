import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) {
      return '';
    }

    const [ $1, $2 ] = value.match(/(^|\s+)(.)/g);
    return `${$1}${$2}`;
  }

}
