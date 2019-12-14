import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Bill} from '../pojo/bill';
@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.styl']
})
export class BillTableComponent {
  @Input()
  header: string[];
  @Input()
  items: Bill[];
  @Input()
  editable: boolean;
  @Output()
  editableCellChanged: EventEmitter<number> = new EventEmitter<number>();

  onAmountCellChanged(payload) {
    this.editableCellChanged.emit(payload);
  }
}
