import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStepperComponent } from './bill-stepper.component';

describe('BillStepperComponent', () => {
  let component: BillStepperComponent;
  let fixture: ComponentFixture<BillStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
