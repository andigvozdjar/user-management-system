import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, finalize, Subject, take, takeUntil } from 'rxjs';
import { PAGE_SIZE_OPTIONS, SORT_DEBOUNCE } from 'src/app/core/core.constants';
import { AlertService } from 'src/app/core/services/alert.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { fadeInAnimation, fadeInOutAnimation } from 'src/app/shared/animations';
import { Route } from 'src/app/shared/browserRoutes.config';
import { RouteData } from 'src/app/shared/models/shared.models';
import { Entity, IBaseService } from '../../models/base.models';
import { DefaultFilter, Filter } from '../../models/filter.models';
import { ActionsTemplateComponent } from './actions-template/actions-template.component';
import { ListFilterInputComponent } from './list-filter-input/list-filter-input.component';
import { FilterInput, LookupFilterList } from './list-filter-input/list-filter-input.models';

@Component({
  template: '',
  styleUrls: ['./base-list.component.scss'],
  animations: [fadeInAnimation, fadeInOutAnimation]
})
export class BaseListComponent<T extends Entity> implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatTable) matTable?: MatTable<T>;
  @ViewChild(MatSort, { static: false }) matSort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChildren(ActionsTemplateComponent) actionsTemplates!: QueryList<ActionsTemplateComponent>;
  @ViewChildren(ListFilterInputComponent) listFilterInputs!: QueryList<ListFilterInputComponent>;

  public readonly templateFilterPrefix = "-filter-input";
  protected previewRelativeToRoute: string = './';

  public displayedColumns: string[] = [];
  public filterColumns: string[] = [];

  public dataSource = new MatTableDataSource<T>();
  public readonly pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

  public routeData!: RouteData;
  protected service!: IBaseService<T>;

  protected defautFilter = DefaultFilter;
  public filter = new BehaviorSubject<Filter>(this.defautFilter);
  protected ignoredCssClassesForPreview: string[] = ['mat-column-actionsTemplate', 'mat-icon', 'mat-button-wrapper', 'mat-button', 'mat-icon-button'];

  public showLoadingBar = true;
  protected deleteDialogMessage: string = 'Are you sure you want to delete this item?';
  public destroyed$: Subject<boolean> = new Subject<boolean>();
  public lookupFilterList: LookupFilterList[] = [];
  public route = Route;

  constructor(
    public activatedRoute: ActivatedRoute,
    protected router: Router,
    protected alertService: AlertService,
    protected dialogService: DialogService
  ) {
    this.getRouteData();
  }

  ngOnInit(): void {
    this.setFilterRow();
    this.prepareLookupData();
  }

  ngAfterViewInit(): void {
    this.subscribeToGridEvents();
    this.getGridData();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  protected prepareLookupData(): void { }

  protected getRouteData(): void {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe((data: Data) => this.routeData = <RouteData>data);
  }

  private subscribeToGridEvents(): void {
    if (this.matPaginator) this.listenPaginator();
    this.listenSort();
    if(this.listFilterInputs) this.listenToFilterChange();
  }

  private listenToFilterChange(): void {
    this.listFilterInputs.forEach((filterInput: ListFilterInputComponent) => {
      filterInput.filterValue
        .pipe(takeUntil(this.destroyed$))
        .subscribe((filterInput: FilterInput) => this.filter.next(this.filter.getValue().applyFilter(filterInput)))
    })
  }

  private listenPaginator(): void {
    this.dataSource.paginator = this.matPaginator;
    setTimeout(() => this.matPaginator.pageSizeOptions = this.pageSizeOptions);
    this.matPaginator?.page
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: PageEvent) => this.filter.next(this.filter.getValue().moveTo(data.pageIndex, data.pageSize)));
  }

  private listenSort(): void {
    this.dataSource.sort = this.matSort;
    this.matSort?.sortChange
      .pipe(
        debounceTime(SORT_DEBOUNCE),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
      .subscribe((data: Sort) => this.filter.next(this.filter.getValue().applySort(data.active, data.direction)));
  }

  protected getGridData(): void {
    this.filter
      .pipe(takeUntil(this.destroyed$))
      .subscribe((filter: Filter) => this.loadGridData(filter) );
  }

  protected loadGridData(filter: Filter): void {
    setTimeout(() => this.showLoadingBar = true );
    this.service.getPage(this.routeData.endpoint, filter)
      .pipe(
        take(1),
        finalize(() => setTimeout(() => this.showLoadingBar = false )),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (data: HttpResponse<T[]>) => {
          if (this.matPaginator) {
            this.matPaginator.length = data.headers.get('x-total-count');
            this.matPaginator.pageSize = filter._limit;
          }
          this.dataSource = new MatTableDataSource<T>(data.body ?? [])
        }
      });
  }

  private setFilterRow(): void {
    this.filterColumns = this.displayedColumns.map(c => c + this.templateFilterPrefix);
  }

  public onRightClick(event: MouseEvent, id: string): void {
    event.preventDefault();
    this.actionsTemplates
      .filter((i: ActionsTemplateComponent) => i.id == id)
      .map((i: ActionsTemplateComponent) => i.openMenu(event) );

    var div = document.getElementsByClassName('cdk-overlay-container');
    div[0].addEventListener("contextmenu", (e) => { e.preventDefault(); false });
  }

  public rowClick(event: any, id: string): void {
    if (event.target.classList && (event.target.classList.value.split(' ')).some((cssClass: string) => this.ignoredCssClassesForPreview.includes(cssClass))) return;
    this.router.navigate([this.previewRelativeToRoute, id], { relativeTo: this.activatedRoute })
  }

  public delete(id: string): void {
    this.dialogService.openSimpleDialog(this.deleteDialogMessage)
      .pipe(
        take(1),
        filter((r: boolean) => r)
      )
      .subscribe(() => 
        this.service.remove(this.routeData.endpoint, id)
          .pipe(take(1))
          .subscribe(() => this.onDeleteSuccess(id))
      );
  }

  protected onDeleteSuccess(id: string): void {
    this.dataSource = new MatTableDataSource(this.dataSource.data.filter((row: T) => row.id !== id));
    this.alertService?.success('Successfully deleted item');
  }

  public refreshList(): void {
    this.loadGridData(this.filter.getValue());
  }
}
