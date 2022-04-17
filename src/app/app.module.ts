import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { BaseModule } from './base/base.module';
import { CoreModule } from './core/core.module';
import { PermissionModule } from './routes/permissions/permission.module';
import { UsersModule } from './routes/users/users.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BaseModule,
    CoreModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    UsersModule,
    PermissionModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
