import {Component, ViewChild} from '@angular/core';
import {CSVReader, CSVResponse, CSVResponseCode} from '../shared/util/csvreader';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {BillPreview} from './pojo/bill-preview';
import {Bill} from './pojo/bill';
import {BillLineChartComponent} from './bill-line-chart/bill-line-chart.component';

@Component({
  selector: 'app-daily-billing',
  templateUrl: './daily-billing.component.html',
  styleUrls: ['./daily-billing.component.styl']
})
export class DailyBillingComponent {
  private csvReader: CSVReader = new CSVReader();
  private billPreview: BillPreview = {isLoaded: false, header: [], items: []};
  private initialBalance: number;
  private lineChartOpts = {
    width: 960,
    height: 500
  };

  @ViewChild(FileUploadComponent, {static: false})
  private fileInputFiled: FileUploadComponent;

  @ViewChild(BillLineChartComponent, {static: false})
  lineChart: BillLineChartComponent;

  /**
   * update the bill mount
   */
  onAmountChanged(payload: any) {
    const bill = this.billPreview.items.find((item: Bill) => item.id === payload.id);
    if (bill) {
      // update amount
      bill.amount = Number(payload.value);
      // refresh line chart on amount changed
      this.lineChart.refreshDot();
    }
  }

  onInitBalanceChanged(initBalance: number) {
    this.initialBalance = initBalance;
  }

  /**
   * read date from CSV file and render to table
   */
  onFileSelected(file: any) {
    this.csvReader.readCSVFile(file, (csvResponse: CSVResponse) => {
      switch (csvResponse.code) {
        case CSVResponseCode.SUCCESS:
          console.log(`[code : ${csvResponse.code} , length : ${csvResponse.records.length}]`);
          // update BillPreview model
          this.billPreview.isLoaded = true;
          this.billPreview.items = csvResponse.records || [];
          this.billPreview.header = csvResponse.header || ['date', 'amount', 'summary'];
          // clear error message
          this.fileInputFiled.updateMessage(null);
          break;
        case CSVResponseCode.EMPTY_RECORD:
        case CSVResponseCode.INVALID_CSV_FILE:
        case CSVResponseCode.CSV_READING_ERROR:
        case CSVResponseCode.OTHER_ERROR:
        default:
          console.log(`[code : ${csvResponse.code} , message : ${csvResponse.message}]`);
          // show error message
          this.fileInputFiled.updateMessage(csvResponse.message);
          break;
      }
    });
  }

}
