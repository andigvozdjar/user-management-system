import { NgModule } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuItemsComponent } from '../layout/sidebar/menu-items/menu-items.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { PendingChangesGuard } from './guards/core.guards';
import { AlertService } from './services/alert.service';
import { DialogService, SimpleDialog } from './services/dialog.service';
import { EnumService } from './services/enum.service';
import { RequestService } from './services/request.service';

export const coreComponents = [
  SidebarComponent,
  MenuItemsComponent,
  HeaderComponent,
  SimpleDialog
];

@NgModule({
  declarations: [
    coreComponents
  ],
  imports: [
    SharedModule
  ],
  exports: [
    coreComponents
  ],
  providers: [
    RequestService,
    AlertService,
    DialogService,
    PendingChangesGuard,
    EnumService
  ]
})
export class CoreModule { }
