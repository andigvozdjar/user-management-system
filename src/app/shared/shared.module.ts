import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxOSelectModule, SelectLocalization } from 'ngx-o-select';
import { ToastrModule } from 'ngx-toastr';
import { TOAST_TIMEOUT } from '../core/core.constants';
import { LayoutWrapperComponent } from './components/layout-wrapper/layout-wrapper.component';
import { UserSimplePreviewComponent } from './components/user-simple-preview/user-simple-preview.component';
import { MatchValueDirective } from './directive/match-value.directive';
import { MenuService } from './services/menu.service';


const sharedMaterialModules = [
  MatIconModule,
  MatSidenavModule, // for mat-drawer - sidebar menu
  MatButtonModule,
  MatExpansionModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatRippleModule,
  MatSortModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [
    LayoutWrapperComponent,
    MatchValueDirective,
    UserSimplePreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    sharedMaterialModules,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: TOAST_TIMEOUT,
      preventDuplicates: true,
    }),
    NgxOSelectModule
  ],
  exports: [
    sharedMaterialModules,
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule,
    LayoutWrapperComponent,
    NgxOSelectModule,
    MatchValueDirective,
    UserSimplePreviewComponent
  ],
  providers: [
    MenuService,
    {
      provide: SelectLocalization, useValue: getSelectLocalization()
    }
  ]
})
export class SharedModule { }

function getSelectLocalization(): SelectLocalization {
  return  new SelectLocalization(
    {
      clearSelection: 'Clear selection',
      noData: 'No data',
      placeholder: '',
      required: '',
      search: 'Search',
      selectAll: 'Select all'
    }
  );
}