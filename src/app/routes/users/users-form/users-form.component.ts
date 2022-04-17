import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OSelectOptionsSource } from 'ngx-o-select';
import { BaseFormComponent } from 'src/app/base/components/base-form/base-form.component';
import { EMAIL_REGEX } from 'src/app/core/core.constants';
import { AlertService } from 'src/app/core/services/alert.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { EnumService } from 'src/app/core/services/enum.service';
import { ValueLabel } from 'src/app/shared/models/shared.models';
import { User, UserStatus } from '../users.models';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent extends BaseFormComponent<User> implements OnInit {
  override requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'repeatPassword'];

  override regexFields = [
    { field: 'email', value: EMAIL_REGEX }
  ];

  userStatusOptions!: OSelectOptionsSource<ValueLabel>;

  constructor(
    public override activatedRoute: ActivatedRoute,
    protected override router: Router,
    protected override alertService: AlertService,
    protected override dialogService: DialogService,
    private enumService: EnumService,
    private userService: UsersService
  ) {
    super(
      activatedRoute,
      router,
      alertService, 
      dialogService,
    )
    this.service = this.userService;
  }

  override prepareLookupData(): void {
    this.userStatusOptions = this.enumService.prepareLoadOptionsForEnum(UserStatus);
  }

}
