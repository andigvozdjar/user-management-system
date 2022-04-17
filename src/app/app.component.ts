import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { MenuService } from './shared/services/menu.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  public menuOpened$: Observable<boolean> = this.menuService.menuOpened.asObservable();

  constructor(
    public menuService: MenuService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.closeSidebarOnRouteChange();
    this.drawer.openedChange.subscribe((bool: boolean) => this.menuService.menuOpened.next(bool));
  }

  private closeSidebarOnRouteChange(): void {
    this.router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if(this.menuService.isMobile && this.menuService.menuOpened.getValue())
          this.menuService.menuOpened.next(false)
      });
  }

}
