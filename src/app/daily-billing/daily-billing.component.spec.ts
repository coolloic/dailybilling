import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBillingComponent } from './daily-billing.component';

describe('DailyBillingComponent', () => {
  let component: DailyBillingComponent;
  let fixture: ComponentFixture<DailyBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
