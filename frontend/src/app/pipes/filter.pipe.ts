import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], min:number, max:number): any[] {
    const resultArray = [];
    if(value.length === 0 || min === null || max === null){
      return value;
    }

    for(const item of value){
      if (item.price >= min && item.price <= max){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
