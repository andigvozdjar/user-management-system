import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/shared/models/shared.models';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuItemsComponent {
  items$: Observable<MenuItem[]>;

  constructor(
    private menuService: MenuService
  ) {
    this.items$ = this.menuService.menuItems.asObservable();
  }

}
