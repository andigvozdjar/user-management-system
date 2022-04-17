import { Component } from '@angular/core';
import { LOGO_PATH } from 'src/app/core/core.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public LOGO_PATH = LOGO_PATH;

  constructor(
  ) { }
}
