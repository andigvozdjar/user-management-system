import { Component, Input, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements OnInit, OnDestroy {
  @Input() heading?: string;
  @Input() subtitle?: string;
  @Input() buttonsTemplate?: TemplateRef<any>;

  private routeSubscription: Subscription = new Subscription();

  constructor(
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRouteData();
  }

  ngOnDestroy(): void {
    if(this.routeSubscription)
      this.routeSubscription.unsubscribe()
  }

  protected getRouteData(): void {
    this.routeSubscription = this.activatedRoute.data
      .pipe(
        take(1),
        filter((data: Data) => Object.keys(data).length != 0)
      )
      .subscribe((data: Data) => {
        this.heading = this.heading ?? data['heading'];
        this.subtitle = this.subtitle ?? data['subtitle'];
      });
  }

}