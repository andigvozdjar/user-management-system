import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter } from 'rxjs';
import { BaseListComponent } from 'src/app/base/components/base-list/base-list.component';
import { AlertService } from 'src/app/core/services/alert.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { EnumService } from 'src/app/core/services/enum.service';
import { User, UserStatus } from '../users.models';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BaseListComponent<User> {
  public UserStatus = UserStatus;
  public override displayedColumns = ['firstName', 'lastName', 'username', 'email', 'status', 'actions'];
  protected override deleteDialogMessage: string = 'Are you sure you want to delete this user?';

  constructor(
    public override activatedRoute: ActivatedRoute,
    protected override router: Router,
    protected override alertService: AlertService,
    protected override dialogService: DialogService,
    private usersService: UsersService,
    private enumService: EnumService
  ) {
    super(
      activatedRoute,
      router,
      alertService,
      dialogService
    )
    this.service = usersService;
  }

  public changeStatus(data: User, status: UserStatus): void {
    this.usersService.changeUserStatusWithQuestion(data, status)
      .pipe(take(1))
      .subscribe((user: User) => this.dataSource.data.find((user: User) => user.id == data.id)!.status = user.status);
  }

  override prepareLookupData(): void {
    this.lookupFilterList.push({
      column: 'status',
      optionsSource: this.enumService.prepareLoadOptionsForEnum(UserStatus),
      valueExpr: 'value',
      displayExpr: 'label'
    });
  }

}
