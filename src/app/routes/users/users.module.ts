import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersFormComponent
  ],
  imports: [
    BaseModule,
    SharedModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }