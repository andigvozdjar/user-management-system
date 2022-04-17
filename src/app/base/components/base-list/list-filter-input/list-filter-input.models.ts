import { Observable } from "rxjs";
import { OSelectOptionsSource } from 'ngx-o-select';

export enum DataType {
  STRING,
  ENUM
}

export interface ListFilterInputConfiguration {
  observable: Observable<any>,
  elementValue: string | number | Date | boolean;
  elementFilter: any;
  debounce: number;
  operation: SearchOperations;
}

export enum SearchOperations {
  EQUALITY = '',
  LIKE = '_like'
}

export interface LookupFilterList {
  column: string,
  optionsSource: OSelectOptionsSource<any>,
  displayExpr?: string,
  valueExpr?: string,
  displayFunc?: Function
}

export class FilterInput {
  column: string;
  value: string;
  operation: SearchOperations

  constructor(column: string, value?: string, operation: SearchOperations = SearchOperations.EQUALITY) {
    this.column = column;
    this.value = value ?? '';
    this.operation = operation;
  }
}