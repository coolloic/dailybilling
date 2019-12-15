import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalableLineChartComponent } from './scalable-line-chart.component';

describe('ScalableLineChartComponent', () => {
  let component: ScalableLineChartComponent;
  let fixture: ComponentFixture<ScalableLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalableLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalableLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
