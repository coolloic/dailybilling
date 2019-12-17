import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CSVReader, CSVResponse, CSVResponseCode} from '../shared/util/csvreader';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {BillPreview} from './pojo/bill-preview';
import {Bill} from './pojo/bill';
import {BillStepperComponent} from './bill-stepper/bill-stepper.component';

@Component({
  selector: 'app-daily-billing',
  templateUrl: './daily-billing.component.html',
  styleUrls: ['./daily-billing.component.styl']
})
export class DailyBillingComponent implements AfterViewInit {
  private csvReader: CSVReader = new CSVReader();
  private billPreview: BillPreview = {isLoaded: false, header: [], items: []};
  private initialBalance: number;
  private lineChartOpts = {
    width: 960,
    height: 500
  };
  private stepper = [
    {select: 'one', title: 'Upload your daily billing CSV file'},
    {select: 'two', title: 'Bill preview'},
    {select: 'three', title: 'Daily billing chart'}
  ];

  @ViewChild(FileUploadComponent, {static: false})
  private fileInputFiled: FileUploadComponent;

  @ViewChild(BillStepperComponent, {static: false})
  private billStepper: BillStepperComponent;

  ngAfterViewInit() {
    this.defectScreenSize();
  }

  // responsive screenSize defection while loading application, mobile first
  private defectScreenSize() {
    const screenSize = window.innerWidth;
    const opts = this.lineChartOpts;
    opts.width = screenSize - 120;
    if (screenSize <= 320) {
      // iPhone5se
      opts.height = 320;
    } else if (screenSize <= 375) {
      // general mobile width
      opts.height = 375;
    } else if (screenSize <= 1024) {
      // smaller than iPad
      opts.height = 500;
    } else {
      // other devices
      opts.height = 550;
    }
  }

  /**
   * update the bill mount
   */
  onAmountChanged(payload: any) {
    const bill = this.billPreview.items.find((item: Bill) => item.id === payload.id);
    if (bill) {
      // update amount
      bill.amount = Number(payload.value);
      // refresh line chart on amount changed
      window.dispatchEvent(new CustomEvent('amount-changed', {detail: this.billPreview.items}));
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
          // update stepper
          this.billStepper.next();
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

  onStepperCancelClicked(event: any) {
    console.log(`onStepperCancelClicked ${event}`);
    this.billStepper.pre();
    if (this.billStepper.activeContentIndex === 1) {
      this.billPreview = {isLoaded: false, header: [], items: []};
    }
  }

  onStepperContinueClicked(event: any) {
    console.log(`onStepperContinueClicked ${event}`);
    this.billStepper.next();
  }

}
