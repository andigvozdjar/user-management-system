import { Component } from '@angular/core';
import { Route } from 'src/app/shared/browserRoutes.config';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public Route = Route;

  constructor(
    private menuService: MenuService,
  ) {}

  toggleSidebar(): void {
    this.menuService.menuOpened.next(!this.menuService.menuOpened.getValue())
  }

}
