import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillLineChartComponent } from './bill-line-chart/bill-line-chart.component';
import { BillPreviewComponent } from './bill-preview/bill-preview.component';
import { BillTableComponent } from './bill-table/bill-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditableTableCellComponent } from './bill-table/editable-table-cell/editable-table-cell.component';
import { BillStepperComponent } from './bill-stepper/bill-stepper.component';



@NgModule({
  declarations: [BillLineChartComponent, BillPreviewComponent, BillTableComponent, FileUploadComponent,
    EditableTableCellComponent, BillStepperComponent],
  imports: [
    CommonModule
  ]
})
export class DailyBillingModule { }
