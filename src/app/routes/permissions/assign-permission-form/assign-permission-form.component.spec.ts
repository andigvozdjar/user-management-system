import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionFormComponent } from './assign-permission-form.component';

describe('AssignPermissionFormComponent', () => {
  let component: AssignPermissionFormComponent;
  let fixture: ComponentFixture<AssignPermissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPermissionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
