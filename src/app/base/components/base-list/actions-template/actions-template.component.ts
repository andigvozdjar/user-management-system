import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Route } from 'src/app/shared/browserRoutes.config';

@Component({
  selector: 'app-actions-template',
  templateUrl: './actions-template.component.html',
  styleUrls: ['./actions-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActionsTemplateComponent implements OnInit {
  @ViewChild("actionsMenuTrigger", { static: false }) actionsMenuTrigger!: MatMenuTrigger;
  @Input() id?: string;
  @Input() active?: boolean;

  @Output() deleteEvent = new EventEmitter<string>();
  @Output() changeStatusEvent = new EventEmitter<void>();

  public Route = Route;
  constructor() { }

  ngOnInit(): void {
  }

  public openMenu(event: MouseEvent): void {
    this.actionsMenuTrigger.openMenu();
    this.setMenuPosition(event, 'fixed');
  }

  public setMenuPosition(event: MouseEvent, position: string = "initial") {
    document.documentElement.style.setProperty('--menu-x', event.clientX + 'px');
    document.documentElement.style.setProperty('--menu-y', event.clientY + 'px');
    document.documentElement.style.setProperty('--menu-position', position);
  }

  public delete(): void {
    this.deleteEvent.emit(this.id);
  }


}
