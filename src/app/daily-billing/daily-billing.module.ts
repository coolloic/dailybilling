import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillLineChartComponent} from './bill-line-chart/bill-line-chart.component';
import {BillPreviewComponent} from './bill-preview/bill-preview.component';
import {BillTableComponent} from './bill-table/bill-table.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {EditableTableCellComponent} from './bill-table/editable-table-cell/editable-table-cell.component';
import {BillStepperComponent} from './bill-stepper/bill-stepper.component';
import {DailyBillingComponent} from './daily-billing.component';
import {DateFormatPipe} from '../shared/pipe/date-format.pipe';
import {SortByDatePipe} from '../shared/pipe/sort-by-date.pipe';
import {ScalableLineChartComponent} from './scalable-line-chart/scalable-line-chart.component';
import {MergeAmountByDatePipe} from '../shared/pipe/merge-amount-by-date.pipe';


@NgModule({
  declarations: [BillLineChartComponent, BillPreviewComponent, BillTableComponent, FileUploadComponent,
    EditableTableCellComponent, BillStepperComponent, DailyBillingComponent, DateFormatPipe, SortByDatePipe,
    MergeAmountByDatePipe, ScalableLineChartComponent],
  exports: [
    DailyBillingComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    SortByDatePipe, MergeAmountByDatePipe
  ]
})
export class DailyBillingModule { }
