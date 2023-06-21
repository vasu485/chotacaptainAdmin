import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], terms: any, arg: string = 'name'): any[] {
    if(!items) return [];
    if(!terms) return items;

    //console.log(terms, "terms", items)

    // terms = terms.toLowerCase();
    return items.filter( it => {
      return it[arg].toLowerCase().includes(terms);
    });
  }
}
