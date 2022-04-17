import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignPermissionFormComponent } from './assign-permission-form/assign-permission-form.component';
import { PermissionsNestedListComponent } from './permissions-nested-list/permissions-nested-list.component';
import { PermissionsService } from './permissions.service';

@NgModule({
  declarations: [
    AssignPermissionFormComponent,
    PermissionsNestedListComponent
  ],
  imports: [
    BaseModule,
    SharedModule
  ],
  providers: [
    PermissionsService
  ]
})
export class PermissionModule { }