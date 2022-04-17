import { Injectable } from '@angular/core';
import { OSelectOptionsSource } from 'ngx-o-select';
import { of } from 'rxjs';
import { ValueLabel } from 'src/app/shared/models/shared.models';

@Injectable()
export class EnumService {

  constructor(
  ) { }
  
  private enumToSelectArray(enumObject: any, isString = false): any[] {
    let array = [];
    for (const [key, value] of Object.entries(enumObject)) {
      if(isString)
        array.push({ value: key, label: key.toLowerCase() }) // here item should be translated
      else if(typeof value == 'number')
        array.push({ value: key, label: key.toLowerCase() })
    }

    return array;
  }

  public prepareLoadOptionsForEnum(enumObject: any, isString: boolean = true): OSelectOptionsSource<ValueLabel[]> {
    let enumSelectArray = this.enumToSelectArray(enumObject, isString);

    return {
      paginate: false,
      pageSize: 1,
      store: {
        key: 'value' as keyof ValueLabel,
        load: () => {
          return of({ content: enumSelectArray })
        },
        byKey: (itemValue: string) => {
          return of({ value: itemValue, label: itemValue.toLowerCase() } as ValueLabel)
        },
      }
    }
  }

}
