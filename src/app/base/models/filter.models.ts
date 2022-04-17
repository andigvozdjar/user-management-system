import { DEFAULT_PAGE } from "src/app/core/core.constants";
import { FilterInput } from "../components/base-list/list-filter-input/list-filter-input.models";

export class Filter {
  _sort?: string | null;
  _order?: string | null;
  _page: number;
  _limit: number;
  filterInput?: FilterInput[] = [];

  constructor(_page: number, _pageSize: number) {
    this._page = 0;
    this._limit = _pageSize;
  }

  public applyFilter(filterInput: FilterInput): Filter {
    let oldFilterInputs = this.filterInput?.filter((fi: FilterInput) => fi.column !== filterInput.column);
    let mergeOldInputsWithNew: FilterInput[] = [...oldFilterInputs ||  [], filterInput];
    this.filterInput = mergeOldInputsWithNew
    return this;
  }

  public applySort(sort?: string, order?: string): Filter {
    this._sort = order ? sort : null;
    this._order = order;
    this._page = 0;
    return this;
  }

  public moveTo(pageIndex: number, pageSize: number): Filter {
    this._page = this._limit != pageSize ? 0 : ++pageIndex;
    this._limit = pageSize;
    return this;
  }

  public mapToFilterApi(): any {
    let apiFilter: any = {...this};

    if(this.filterInput && this.filterInput.length > 0)
      this.filterInput.forEach((fi: FilterInput) => apiFilter[fi.column+fi.operation] = fi.value);
    
    for (const [key, value] of Object.entries(apiFilter)) 
      if(value == null || value == '' || key == 'filterInput')
        delete apiFilter[key];
    return apiFilter;
  }
}

export const DefaultFilter = new Filter(0, DEFAULT_PAGE)