import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLineChartComponent } from './bill-line-chart.component';

describe('BillLineChartComponent', () => {
  let component: BillLineChartComponent;
  let fixture: ComponentFixture<BillLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
