import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from '../models/animal.model';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(items: Animal[], filter): any {
    if(!items || !filter) {
    return items;
    }
    return items.filter(item => item.name.indexOf(filter) !== -1);
  }
}
