import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsNestedListComponent } from './permissions-nested-list.component';

describe('PermissionsNestedListComponent', () => {
  let component: PermissionsNestedListComponent;
  let fixture: ComponentFixture<PermissionsNestedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsNestedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsNestedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
