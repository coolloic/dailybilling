import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-editable-table-cell',
  templateUrl: './editable-table-cell.component.html',
  styleUrls: ['./editable-table-cell.component.styl']
})
export class EditableTableCellComponent {
  @Input()
  amount: number;
  @Input()
  id: any;
  @Input()
  editable: boolean;
  @Output()
  amountChangeEmitter: EventEmitter<any> = new EventEmitter<any>();
  activated = false;

  onAmountChanged(event) {
    if (this.editable) {
      this.amountChangeEmitter.emit({
        id: this.id,
        value: event.target.value
      });
    }
  }
}
