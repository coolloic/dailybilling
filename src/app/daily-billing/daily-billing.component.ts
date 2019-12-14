import {Component} from '@angular/core';
import {CSVReader, CSVResponse, CSVResponseCode} from '../shared/util/csvreader';

@Component({
  selector: 'app-daily-billing',
  templateUrl: './daily-billing.component.html',
  styleUrls: ['./daily-billing.component.styl']
})
export class DailyBillingComponent {
  private csvReader: CSVReader = new CSVReader();

  onFileSelected(file: any) {
    this.csvReader.readCSVFile(file, (csvResponse: CSVResponse) => {
      switch (csvResponse.code) {
        case CSVResponseCode.SUCCESS:
          console.log(`[code : ${csvResponse.code} , length : ${csvResponse.records.length}]`);
          break;
        case CSVResponseCode.EMPTY_RECORD:
        case CSVResponseCode.INVALID_CSV_FILE:
        case CSVResponseCode.CSV_READING_ERROR:
        case CSVResponseCode.OTHER_ERROR:
        default:
          console.log(`[code : ${csvResponse.code} , message : ${csvResponse.message}]`);
          break;
      }
    });
  }

}
