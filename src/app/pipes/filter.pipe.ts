import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[]): any {
    if (!items) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    // return items.filter(item => item[filter['field']].indexOf(filter['value']) !== -1);
    return items.filter(item => item.sigla_provincia !== null);
  }
}
