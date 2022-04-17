import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable, tap } from 'rxjs';
import { detailExpand } from 'src/app/shared/animations';
import { Permission, PermissionGroup } from '../permission.models';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'app-permissions-nested-list',
  templateUrl: './permissions-nested-list.component.html',
  styleUrls: ['./permissions-nested-list.component.scss'],
  animations: [detailExpand]
})
export class PermissionsNestedListComponent {
  public dataSource$: Observable<PermissionGroup[]> = new Observable<PermissionGroup[]>();

  @Input() userPermissions: Permission[] | undefined;
  @Output() userPermissionsChange = new EventEmitter<Permission[]>();

  public expandedElements: string[] = [];
  displayedColumns: string[] = ['expand', 'value', 'description'];
  expandedPermission: PermissionGroup | null = null;

  constructor(
    private permissionsService: PermissionsService
  ) {
    this.dataSource$ = this.permissionsService.prepareGroupedPermissions()
      .pipe(
        tap({
          next: (data: PermissionGroup[]) => this.openFirstLevel(data)
        })
      )
  }

  openFirstLevel(data: PermissionGroup[]): void {
    this.expandedElements = data.map((el) => el.value) as string[];
  } 

  public toggleRow(row: PermissionGroup): void {
    if (!row.children || row.children.length == 0) return;
    this.expandedElements = !this.expandedElements.includes(row.value as string) ? [...this.expandedElements, row.value as string] : this.expandedElements.filter(e => e != row.value);
  }

  public checkBoxChange(event: MatCheckboxChange, permission: Permission): void {
    event.checked ? this.userPermissionsChange.emit([...this.userPermissions || [], permission]) : this.userPermissionsChange.emit(this.userPermissions!.filter((selected: Permission) => selected.id != permission.id));    
  }

  isCheckedCheckBox(permission: Permission): boolean {
    return this.userPermissions!.some((p: Permission) => permission.id == p.id);
  }

}
