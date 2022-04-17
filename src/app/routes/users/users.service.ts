import { Injectable } from "@angular/core";
import { filter, Observable, switchMap } from "rxjs";
import { BaseService } from "src/app/base/services/base.service";
import { Endpoint } from "src/app/core/endpoints.constants";
import { DialogService } from "src/app/core/services/dialog.service";
import { RequestService } from "src/app/core/services/request.service";
import { User, UserStatus } from "./users.models";

@Injectable()
export class UsersService extends BaseService<User> {

  constructor(
    protected dialogService: DialogService,
    protected override requestService: RequestService
  ) {
    super(requestService);
  }

  public changeUserStatusWithQuestion(data: User, status: UserStatus): Observable<User> {
    return this.dialogService.openSimpleDialog(`Are you sure you want to ${data.status == UserStatus.ACTIVE ? 'deactivate' : 'activate'} this user`)
      .pipe(
        filter((res: boolean) => res),
        switchMap(() => this.patch(`${Endpoint.USERS}/${data.id}`, {...data, status}) )
      )

  }
}