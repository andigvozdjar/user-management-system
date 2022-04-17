import { Component, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { OSelectComponent } from 'ngx-o-select';
import { filter, finalize, Observable, Observer, Subject, take, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Route } from 'src/app/shared/browserRoutes.config';
import { RouteData } from 'src/app/shared/models/shared.models';
import { Entity, IBaseService } from '../../models/base.models';

@Component({
  template: '',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent<T extends Entity> implements OnInit, OnDestroy {
  @ViewChild('ngForm') ngForm!: NgForm;
  @ViewChildren(OSelectComponent) selectComponents!: QueryList<OSelectComponent>;

  requiredFields?: string[];
  regexFields?: ValidatorKeyValue[];
  formData!: T;
  private initialFormData?: T;
  protected service!: IBaseService<T>;
  public id: string = this.activatedRoute.snapshot.params['id'];
  protected routeData!: RouteData;
  public showLoadingBar = false;
  protected deleteDialogMessage: string = 'Are you sure you want to delete this item?';
  public route = Route
  public pendingChanges: boolean = false;

  destroyed$: Subject<boolean> = new Subject<boolean>();
  public pendingChangesDialog?: Observable<boolean>;

  @HostListener('window:beforeunload')
    public canDeactivate(): boolean {
      return !this.pendingChanges;
    }

  constructor(
    public activatedRoute: ActivatedRoute,
    protected router: Router,
    protected alertService: AlertService,
    protected dialogService: DialogService
  ) {
    this.getRouteData();
    this.preparePendingChangesDialog();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.prepareLookupData();
  }

  private getRouteData(): void {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe((data: Data) => this.routeData = <RouteData>data );
  }

  protected prepareLookupData(): void { }

  async prepareForm(initialData = new Object()): Promise<T> {
    let source = initialData;
    return new Promise(async (resolve) => {
      if (this.id != null) {
        setTimeout(() => this.showLoadingBar = true ); // using settimeout to supress expressionchangedafterithasbeenchecked
        this.service.getOne(this.routeData.endpoint, this.id)
          .pipe(
            take(1),
            finalize(() => setTimeout(() => this.showLoadingBar = false ) )
          )
          .subscribe((res: T) => {
            source = { ...source, ...res };
            this.formData = source as T;
            resolve(source as T);
            this.setInitialValues(this.formData);
            this.setValidators();
            this.subscribeToNgForm();
          });
      } else {
        this.formData = source as T;
        resolve(source as T);
        this.setValidators();
      }
    });
  }

  protected setInitialValues(formData: T): void {
    this.initialFormData = JSON.parse(JSON.stringify(formData));
  }

  subscribeToNgForm(): void {
    setTimeout(() => {
      if(!this.ngForm) return;
      this.ngForm.form.valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe((newValue: T) => {
          if (!this.pendingChanges && this.initialFormData)
            this.pendingChanges = Object.keys(newValue).some((key) => this.initialFormData![key as keyof T] !== newValue[key as keyof T] );
        });
      this.pendingChangesForSelect();
    }, 100);
  }

  private pendingChangesForSelect(): void {
    if (this.selectComponents.length > 0)
      this.selectComponents.forEach((el: OSelectComponent) => {
        el.selectionChange
          .pipe(takeUntil(this.destroyed$))
          .subscribe(() => {
            if(!this.pendingChanges)
              this.pendingChanges = true;
          });
      });
  }  

  private preparePendingChangesDialog(): void {
    this.pendingChangesDialog = new Observable<boolean>((observer: Observer<boolean>) =>
      this.dialogService.openSimpleDialog('There are some changes that were not saved. Do you want to save them?')
        .pipe(take(1))
        .subscribe((dialogRes: boolean) => {
          if (dialogRes)
            this.onSubmit();
          observer.next(true);
          observer.complete();
        })
    );
  }

  public onSubmit(): void {
    if (!this.isFormValid()) return;
    this.showLoadingBar = true;
    this.id ?
      this.service
        .update(`${this.routeData.endpoint}/${this.id}`, this.formData)
        .pipe(
          take(1),
          finalize(() => setTimeout(() => this.showLoadingBar = false ) )
        )
        .subscribe(() => this.onSaveSuccess() )
      : this.service
        .create(this.routeData.endpoint, this.formData )
        .pipe(
          take(1),
          finalize(() => setTimeout(() => this.showLoadingBar = false ) )
        )
        .subscribe(() => this.onSaveSuccess() );
  }

  protected onSaveSuccess(): void {
    this.pendingChanges = false;
    this.alertService.success('Changes saved successfully');
    let currentRoute = this.router.url.split('/');
    currentRoute.shift();
    currentRoute.pop();
    this.router.navigateByUrl(currentRoute.join('/'));
  }

  public isFormValid(): boolean {
    this.ngForm.form.markAllAsTouched();
    let isAllSelectedComponentsValid = true;

    if (this.selectComponents.length > 0 && this.ngForm.form.valid)
      isAllSelectedComponentsValid = this.selectComponents.toArray().every((item: OSelectComponent) => !(item.required && !item.value));

    return this.ngForm.form.valid && isAllSelectedComponentsValid;
  }

  protected setValidators(): void {
    setTimeout(() => {
      if (this.requiredFields)
        this.addValidators(Validators.required, this.requiredFields);
      if (this.regexFields)
        this.regexFields.forEach((ml) =>
          this.setRegexFields([ml.field], ml.value as RegExp | string)
        );
    }, 100);
  }

  private setRegexFields(fields: string[], pattern: string | RegExp): void {
    this.addValidators(Validators.pattern(pattern), fields);
  }

  private addValidators(validator: ValidatorFn, fields: string[]): void {
    if (fields.length === 0 || !this.ngForm) return;
    fields.forEach((field) => {
      if (this.ngForm.form.controls[field]) {
        this.ngForm.form.controls[field].addValidators([validator]);
        this.ngForm.form.controls[field].updateValueAndValidity();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

export interface ValidatorKeyValue {
  field: string;
  value: number | string | RegExp;
}
