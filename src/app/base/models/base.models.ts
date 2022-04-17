import { HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Filter } from "./filter.models";

export class Entity {
  id: string;
  version: number;
  constructor(id: string, version: number = 0) {
    this.id = id;
    this.version = version;
  }
}

export interface IBaseService<T extends Entity> {
  create(url: string, body: T): Observable<T>;
  patch(url: string, body: T): Observable<T>;
  update(url: string, body: T): Observable<T>;
  remove(url: string, id: string): Observable<void>;
  getOne(url: string, id: string): Observable<T>;
  getList(url: string, params: HttpParams): Observable<T[]>;
  getPage(url: string, filter: Filter): Observable<HttpResponse<T[]>>;
}

export interface Page<T> {
  content: T[], // TODO provjeriti
  empty?: boolean,
  first?: boolean,
  last?: boolean,
  number?: number,
  numberOfElements?: number,
  pageable?: any,
  size?: number,
  sort?: any,
  totalElements?: number,
  totalPages?: number
}
