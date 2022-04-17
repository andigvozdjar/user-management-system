import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterInputComponent } from './list-filter-input.component';

describe('ListFilterInputComponent', () => {
  let component: ListFilterInputComponent;
  let fixture: ComponentFixture<ListFilterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFilterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
