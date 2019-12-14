import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTableComponent } from './bill-table.component';

describe('BillTableComponent', () => {
  let component: BillTableComponent;
  let fixture: ComponentFixture<BillTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
