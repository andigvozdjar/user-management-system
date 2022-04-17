import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {
  private defaultTime = 3000;
  constructor(
    private toastr: ToastrService
  ) { }

  public success(message: string): void {
    this.toastr.success(message, '', { timeOut: this.defaultTime});
  }

  public error(message: string): void {
    this.toastr.error(message, '', { timeOut: this.defaultTime });
  }
}
