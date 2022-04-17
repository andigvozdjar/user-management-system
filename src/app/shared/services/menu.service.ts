import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MENU } from '../menu';
import { MenuItem } from '../models/shared.models';

@Injectable()
export class MenuService {
  public isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  public menuOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!this.isMobile);

  public menuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject(new Array<MenuItem>())

  constructor(
  ) {
    this.generateMenu()
  }

  private generateMenu(): void {
    let menu: MenuItem[] = JSON.parse(JSON.stringify(MENU));
    this.menuItems.next(menu);
  }

}
