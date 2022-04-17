import { Routes } from "@angular/router";
import { Endpoint } from "./core/endpoints.constants";
import { PendingChangesGuard } from "./core/guards/core.guards";
import { AssignPermissionFormComponent } from "./routes/permissions/assign-permission-form/assign-permission-form.component";
import { UsersFormComponent } from "./routes/users/users-form/users-form.component";
import { UsersListComponent } from "./routes/users/users-list/users-list.component";
import { Route } from "./shared/browserRoutes.config";
import { RouteData } from "./shared/models/shared.models";

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.USERS
  },
  {
    path: Route.USERS,
    component:UsersListComponent,
    data: new RouteData('Users', 'Users list', Endpoint.USERS)
  },
  {
    path: `${Route.USERS}/${Route.NEW}`,
    component: UsersFormComponent,
    data: new RouteData('Users', 'Create user', Endpoint.USERS)
  },
  {
    path: `${Route.USERS}/${Route.ASSIGN}/:id`,
    canDeactivate: [PendingChangesGuard],
    component: AssignPermissionFormComponent
  },
  {
    path: `${Route.USERS}/:id`,
    component: UsersFormComponent,
    canDeactivate: [PendingChangesGuard],
    data: new RouteData('Users', 'Edit user', Endpoint.USERS)
  }
];