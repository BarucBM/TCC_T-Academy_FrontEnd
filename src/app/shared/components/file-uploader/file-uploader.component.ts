import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { SharedModule } from '../../modules/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [SharedModule, FileUploadModule, BadgeModule, ProgressBarModule, ToastModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {
  @Output() filesSelected = new EventEmitter<File[]>();
  @Input() maxFileSize: number = 1000000;
  @Input() controlName: string = 'images';
  @Input() multiple: boolean = true;
  files: File[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  constructor(private config: PrimeNGConfig, private messageService: MessageService) { }

  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });

    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;

    if (this.totalSize > this.maxFileSize) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size exceeds limit' });
      this.files = [];
      this.totalSize = 0;
      this.totalSizePercent = 0;
    } else {
      this.filesSelected.emit(this.files);
    }
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes ?? '';
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  choose(event: any, callback: any) {
    callback();
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;
  }

  onClearTemplatingUpload(clear: any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  uploadEvent(callback: any) {
    callback();
  }
}