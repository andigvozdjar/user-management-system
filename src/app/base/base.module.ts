import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BaseFormComponent } from "./components/base-form/base-form.component";
import { ActionsTemplateComponent } from "./components/base-list/actions-template/actions-template.component";
import { BaseListComponent } from "./components/base-list/base-list.component";
import { ListFilterInputComponent } from "./components/base-list/list-filter-input/list-filter-input.component";
import { BaseService } from "./services/base.service";

const baseComponents = [
  BaseListComponent,
  BaseFormComponent,
  ActionsTemplateComponent,
  ListFilterInputComponent
];

@NgModule({
  declarations: [
    baseComponents
  ],
  imports: [
    SharedModule
  ],
  exports: [
    baseComponents
  ],
  providers: [
    BaseService
  ]

})
export class BaseModule {}
