import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Bill} from '../pojo/bill';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.styl']
})
export class BillPreviewComponent {
  @Input()
  defaultValue: number;
  @Input()
  header: string[];
  @Input()
  items: Bill[];
  @Output()
  initBalanceChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  tableCellChangeEmitter: EventEmitter<number> = new EventEmitter<number>();

  onInitBalanceChanged(event) {
    this.initBalanceChangeEmitter.emit(Number(event.target.value));
  }

  onTableCellChanged(payload) {
    this.tableCellChangeEmitter.emit(payload);
  }
}
