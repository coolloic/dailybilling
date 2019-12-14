import {Component, EventEmitter, Input, Output} from '@angular/core';

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
  private message: string;

  onFileSelected(event: any): void {
    this.fileChangeEmitter.emit(event.target.files[0]);
  }

  updateMessage(message: string) {
    this.message = message;
  }
}
