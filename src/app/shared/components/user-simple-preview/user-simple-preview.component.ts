import { Component, Input } from '@angular/core';
import { User } from 'src/app/routes/users/users.models';
import { fadeInOutAnimation } from '../../animations';

@Component({
  selector: 'app-user-simple-preview',
  templateUrl: './user-simple-preview.component.html',
  styleUrls: ['./user-simple-preview.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UserSimplePreviewComponent {
  @Input() user: User | undefined;

  constructor() {}

}
