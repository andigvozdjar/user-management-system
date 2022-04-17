import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BaseService } from 'src/app/base/services/base.service';
import { Endpoint } from 'src/app/core/endpoints.constants';
import { AlertService } from 'src/app/core/services/alert.service';
import { RequestService } from 'src/app/core/services/request.service';
import { User } from '../users/users.models';
import { Permission, PermissionGroup } from './permission.models';

@Injectable()
export class PermissionsService extends BaseService<Permission> {

  constructor(
    protected override requestService: RequestService,
    private alertService: AlertService
  ) {
    super(requestService);
  }

  public changeUserPermissions(user: User): Observable<User> {
    return this.patch(`${Endpoint.USERS}/${user.id}`, user)
      .pipe(
        tap({
          next: () => this.alertService.success(`Successfully applied permissions for ${user.email}`)
        })
      )
  }

  public prepareGroupedPermissions(): Observable<PermissionGroup[]> {
    return this.getList(Endpoint.PERMISSIONS)
      .pipe(map((permissions: Permission[]) => this.groupPermissions(permissions)));
  }

  private groupPermissions(permissions: Permission[]): PermissionGroup[] {
    let groups: PermissionGroup[] = [];

    for (let privilege of permissions) {
      if (!privilege.permissionGroup)
        privilege.permissionGroup = 'Ungrouped';

      if (groups.findIndex(g => g.value === privilege.permissionGroup) < 0)
        groups.push({ value: privilege.permissionGroup })
    }

    for (let group of groups)
      group.children = permissions.filter(p => p.permissionGroup === group.value);

    return groups;
  }
}
