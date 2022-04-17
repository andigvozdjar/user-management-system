import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSimplePreviewComponent } from './user-simple-preview.component';

describe('UserSimplePreviewComponent', () => {
  let component: UserSimplePreviewComponent;
  let fixture: ComponentFixture<UserSimplePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSimplePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSimplePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
