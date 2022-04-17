import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Observer, take } from 'rxjs';
import { Endpoint } from 'src/app/core/endpoints.constants';
import { DialogService } from 'src/app/core/services/dialog.service';
import { fadeInOutAnimation } from 'src/app/shared/animations';
import { Route } from 'src/app/shared/browserRoutes.config';
import { User } from '../../users/users.models';
import { UsersService } from '../../users/users.service';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'app-assign-permission-form',
  templateUrl: './assign-permission-form.component.html',
  styleUrls: ['./assign-permission-form.component.scss'],
  animations: [fadeInOutAnimation]
})
export class AssignPermissionFormComponent implements OnInit {
  public user!: User;
  public id: string = this.activatedRoute.snapshot.params['id'];
  public pendingChanges: boolean = false;
  public pendingChangesDialog?: Observable<boolean>;
  
  @HostListener('window:beforeunload')
    public canDeactivate(): boolean {
      return !this.pendingChanges;
    }

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    protected dialogService: DialogService,
    private permissionsService: PermissionsService,
    private router: Router
  ) {
    this.preparePendingChangesDialog();
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.usersService.getOne(Endpoint.USERS, this.id)
      .pipe(
        take(1),
        map((user: User) => {
          user.permissions = user.permissions ?? []
          return user;
        })
      )
      .subscribe((user: User) => this.user = user );
  }

  public changePermissions(): void {
    this.permissionsService.changeUserPermissions(this.user)
      .subscribe(() => {
        this.pendingChanges = false;
        this.router.navigate(['/'+Route.USERS])
      });
  }
  
  private preparePendingChangesDialog(): void {
    this.pendingChangesDialog = new Observable<boolean>((observer: Observer<boolean>) =>
      this.dialogService.openSimpleDialog('There are some changes that were not saved. Do you want to save them?')
        .pipe(take(1))
        .subscribe((dialogRes: boolean) => {
          if (dialogRes)
            this.changePermissions();
          observer.next(true);
          observer.complete();
        })
    );
  }

  userPermissionsChange(): void {
    this.pendingChanges = true;
  }

}
