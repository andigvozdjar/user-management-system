import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: any): boolean | Observable<boolean> {
    return component.canDeactivate() ? true : component.pendingChangesDialog;
  }
}

interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
