import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-bill-stepper',
  templateUrl: './bill-stepper.component.html',
  styleUrls: ['./bill-stepper.component.styl']
})
export class BillStepperComponent {
  @Input()
  data: any;
  @Output()
  cancelClickEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  continueClickEmitter: EventEmitter<number> = new EventEmitter<number>();
  activeContentIndex: 1 | 2 | 3 = 1;

  cancelClicked(event) {
    console.log(`cancel clicked ${event}`);
    if (this.cancelClickEmitter) {
      this.cancelClickEmitter.emit(event);
    }
  }

  continueClicked(event) {
    console.log(`continue clicked ${event}`);
    if (this.continueClickEmitter) {
      this.continueClickEmitter.emit(event);
    }
  }

  updateActiveContentIndex(index: 1 | 2 | 3) {
    this.activeContentIndex = index;
  }

  next() {
    this.activeContentIndex++;
  }

  pre() {
    this.activeContentIndex--;
  }

}
