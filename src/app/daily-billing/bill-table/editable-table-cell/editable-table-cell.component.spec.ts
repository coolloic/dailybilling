import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTableCellComponent } from './editable-table-cell.component';

describe('EditableTableCellComponent', () => {
  let component: EditableTableCellComponent;
  let fixture: ComponentFixture<EditableTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
