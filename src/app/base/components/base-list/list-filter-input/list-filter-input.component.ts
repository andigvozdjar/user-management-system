import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { OSelectComponent } from 'ngx-o-select';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';
import { TEXT_INPUT_DEBOUNCE, TEXT_INPUT_MIN_LENGTH } from 'src/app/core/core.constants';
import { DataType, ListFilterInputConfiguration, LookupFilterList, SearchOperations } from './list-filter-input.models';

@Component({
  selector: 'app-list-filter-input',
  templateUrl: './list-filter-input.component.html',
  styleUrls: ['./list-filter-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListFilterInputComponent implements OnInit {
  @ViewChild('input', { static: false }) input!: ElementRef;
  @ViewChild(OSelectComponent) selectComponent!: OSelectComponent;

  @Input() disabled: boolean = false;
  @Input() column!: string;
  @Input() disabledColumns!: string[];
  @Input() numberColumns: string[] = [];
  @Input() enumColumns: string[] = [];
  @Input() lookupFilterList: LookupFilterList[] = [];

  @Output() filterValue = new EventEmitter();
  public type: DataType = DataType.STRING;
  public DataType = DataType;
  public lookupFilter!: LookupFilterList;

  constructor() { }

  ngOnInit(): void {
    if (this.disabledColumns)
      this.disabled = this.disabledColumns.includes(this.column);
    this.setType();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscribeToEventChanges();
    }, 200);
  }

  setType(): void {
    if (this.enumColumns.includes(this.column)) {
      this.type = DataType.ENUM;
      this.setEnumDataSource();
    }
  }

  private setEnumDataSource(): void {
    this.lookupFilter = this.lookupFilterList?.find((lfl: LookupFilterList) => lfl.column === this.column) as LookupFilterList;
  }

  private subscribeToEventChanges(): void {
    if(!this.getTypeConfiguration().observable) return;
    this.getTypeConfiguration().observable
      .pipe(
        map((event: any) => this.getTypeConfiguration(event).elementValue )
        , filter(res => this.getTypeConfiguration(res).elementFilter)

        , debounceTime(this.getTypeConfiguration().debounce)

        , distinctUntilChanged()
      ).subscribe((value: any) => {
        let filter = { column: this.column, value: value, operation: this.getTypeConfiguration().operation }
        this.filterValue.emit(filter)
      })
  }
  private getTypeConfiguration(functionInput?: any): ListFilterInputConfiguration {
    switch (this.type) {
      case DataType.STRING:
        return {
          observable: fromEvent(this.input?.nativeElement, 'keyup'),
          elementValue: functionInput?.target?.value as string,
          elementFilter: functionInput?.length > TEXT_INPUT_MIN_LENGTH || functionInput?.length === 0,
          debounce: TEXT_INPUT_DEBOUNCE,
          operation: SearchOperations.LIKE
        }
      case DataType.ENUM:
        return {
          observable: this.selectComponent?.selectionChange,
          elementValue: functionInput ? functionInput[this.lookupFilter?.valueExpr as string ?? 'value'] : '',
          elementFilter: true,
          operation: SearchOperations.EQUALITY,
          debounce: 0
        }
    }
  }

}
