import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Bill} from '../pojo/bill';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.styl']
})
export class BillTableComponent implements OnInit, OnDestroy {
  @Input()
  pageSize: number;
  @Input()
  isTile: boolean;
  @Input()
  header: string[];
  @Input()
  items: Bill[];
  @Input()
  editable: boolean;
  @Output()
  editableCellChanged: EventEmitter<number> = new EventEmitter<number>();
  private currentPage: number;
  private itemPerPage: number;
  private totalPage: number;
  private pages: number[] = [];
  private filteredItem: Bill[];
  private maxDisplayedIndex: number;
  private translateX: number;
  private prevIndex: number;

  ngOnInit(): void {
    this.itemPerPage = this.pageSize ? this.pageSize : 10;
    this.totalPage = Number(this.items.length / this.itemPerPage);
    for (let i = 0; i < this.totalPage; i++) {
      this.pages.push(i + 1);
    }
    this.currentPage = 1;
    this.prevIndex = 1;
    this.filteredItem = this.items;
    this.translateX = 0;
    this.updateFilteredItem();
    this.defectScreenSize();
  }

  ngOnDestroy(): void {
    this.currentPage = 1;
  }

  onAmountCellChanged(payload) {
    this.editableCellChanged.emit(payload);
  }

  updateFilteredItem() {
    this.filteredItem = this.items.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage);
  }

  pre() {
    this.preStep();
    this.updateFilteredItem();
  }

  preStep() {
    this.currentPage--;
    this.prevIndex = this.currentPage;
    if (this.currentPage > 1) {
      this.translateX += 50;
      this.translateX = this.translateX > 0 ? 0 : this.translateX;
    }
  }

  next() {
    this.nextStep();
    this.updateFilteredItem();
  }

  nextStep() {
    this.currentPage++;
    this.prevIndex = this.currentPage;
    if ((this.currentPage - 2) <= this.totalPage - this.maxDisplayedIndex) {
      this.translateX -= 50;
    }
  }

  goto(index: number) {
    const offset = index - this.prevIndex;
    const direction = offset > 0;
    for (let i = 0; i < Math.abs(offset); i++) {
      if (direction) {
        this.nextStep();
      } else {
        this.preStep();
      }
    }
    this.updateFilteredItem();
  }


  // responsive screenSize defection while loading application, mobile first
  private defectScreenSize() {
    const screenSize = window.innerWidth;
    if (screenSize < 768) {
      this.maxDisplayedIndex = 3;
    } else if (screenSize < 1024) {
      // general mobile width
      this.maxDisplayedIndex = 4;
    } else {
      this.maxDisplayedIndex = 7;
    }
  }
}
