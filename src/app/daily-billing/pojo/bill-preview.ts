import {Bill} from './bill';

export interface BillPreview {
  isLoaded: boolean;
  header: string[];
  items: Bill[];
}
