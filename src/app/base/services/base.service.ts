import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/services/request.service';
import { Entity, IBaseService } from '../models/base.models';
import { Filter } from '../models/filter.models';

@Injectable()
export class BaseService<T extends Entity> implements IBaseService<T> {

  constructor(
    protected requestService: RequestService
  ) {}

  public getPage(url: string, filter: Filter): Observable<HttpResponse<T[]>> {
    return this.requestService.get(url, { params: new HttpParams({ fromObject: filter.mapToFilterApi() }), observe: 'response' });
  }

  public create(url: string, body: T): Observable<T> {
    return this.requestService.post<T>(url, body);
  }

  public update(url: string, body: T): Observable<T> {
    return this.requestService.put<T>(url, body);
  }

  public getOne(url: string, id: string): Observable<T> {
    return this.requestService.get<T>(`${url}/${id}`);
  }

  public remove(url: string, id: string): Observable<void> {
    return this.requestService.remove(`${url}/${id}`);
  }

  public patch(url: string, body: T): Observable<T> {
    return this.requestService.patch<T>(url, body);
  }

  public getList(url: string, params?: HttpParams): Observable<T[]> {
    return this.requestService.get<T[]>(url, params);
  }
}
