import {throwError} from 'rxjs';

export const CSV_EXTENSION = '.csv';

export enum CSVResponseCode {
  SUCCESS,
  INVALID_CSV_FILE,
  EMPTY_RECORD,
  CSV_READING_ERROR,
  OTHER_ERROR
}

export interface CSVResponse {
  code: CSVResponseCode;
  records: any[];
  message?: string;
  header: any[];
}

export class CSVReader {
  /**
   * Read CSV File and return CSVResponse
   * @param file
   * @param callback
   */
  readCSVFile(file: File, callback: any): CSVResponse {
    if (this._isValidCSVFile(file)) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csvData = reader.result as string;
        const csvRecords = csvData.split(/\r\n|\n/);
        const header = this._getHeaderArr(csvRecords);
        const records = this._getRecords(csvRecords.slice(1), header.length);
        if (records.length > 0) {
          callback({
            code: CSVResponseCode.SUCCESS,
            records,
            header
          });
        } else {
          callback({
            code: CSVResponseCode.EMPTY_RECORD,
            records: [],
            message: 'Empty records'
          });
        }
      };
      reader.onerror = (e) => {
        return callback({
          code: CSVResponseCode.CSV_READING_ERROR,
          records: [],
          message: 'Reading file exception'
        });
      };
    } else {
      return callback({
        code: CSVResponseCode.INVALID_CSV_FILE,
        records: [],
        message: 'Invalid file extension'
      });
    }
  }

  private _isValidCSVFile(file: File) {
    if (file instanceof File) {
      return file.name.endsWith(CSV_EXTENSION);
    }
    throwError('Is not a valid CSV file');
  }

  private _getHeaderArr(csvHeadersArr: any) {
    const headers = (csvHeadersArr[0] as string).split(',');
    const headerArr = [];
    for (const col of headers) {
      headerArr.push(col);
    }
    return headerArr;
  }

  private _getRecords(records: any, length: number) {
    const dataset: any[] = [];
    let index = 0;
    for (const record of records) {
      const cols = (record as string).split(',');
      if (cols.length === length) {
        try {
          dataset.push({
            id: ++index,
            date: cols[0] ? Date.parse((cols[0] as string).trim()) : throwError(`date is empty`),
            amount: cols[1] ? Number((cols[1] as string).trim()) : throwError('amount is undefined'),
            summary: cols[2] ? (cols[2] as string).trim() : ''
          });
        } catch (e) {
          console.error('invalid record ', e);
        }
      }
    }
    return dataset;
  }
}
