import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openSimpleDialog(message: string): Observable<boolean> {
    return this.dialog.open(SimpleDialog, { data: { message: message } })
      .afterClosed();
  }
}

export interface SimpleDialogData {
  message: string;
}

@Component({
  template: `
  <div>
    <h3 mat-dialog-title>{{ data.message }}</h3>
    <div mat-dialog-actions align="end">
      <button mat-stroked-button (click)="closeDialog()">No</button>
      <button mat-button color="primary" (click)="confirmDialog()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `
})
export class SimpleDialog {
  constructor(
      public dialogRef: MatDialogRef<SimpleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData
  ) { }

  closeDialog(): void {
      this.dialogRef.close(false);
  }

  confirmDialog(): void {
      this.dialogRef.close(true);
  }
}