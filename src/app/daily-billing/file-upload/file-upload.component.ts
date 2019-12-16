import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.styl']
})
export class FileUploadComponent {
  @Input()
  buttonLabel: string;
  @Output()
  fileChangeEmitter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('fileInput', {static: false})
  field: ElementRef;
  private message: string;

  onFileSelected(event: any): void {
    this.fileChangeEmitter.emit(event.target.files[0]);
    this.field.nativeElement.value = null;
  }

  updateMessage(message: string) {
    this.message = message;
  }
}
