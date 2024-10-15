import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { SharedModule } from '../../modules/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { Image } from '../../../core/models/image.model';
import { ImageProcessorService } from '../../../core/services/image-processor.service';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [SharedModule, FileUploadModule, BadgeModule, ProgressBarModule, ToastModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent implements OnInit {
  @Output() imagesSelected = new EventEmitter<Image[]>();
  @Input() maxFileSize: number = 1000000;
  @Input() controlName: string = 'images';
  @Input() multiple: boolean = true;
  @Input() uploadedImages: Image[] = [];
  images: Image[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  constructor(private config: PrimeNGConfig, private imageProcessorService: ImageProcessorService, private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.uploadedImages) {
      this.uploadedImages.forEach((image) => {
        this.totalSize += parseInt(this.formatSize(image.file.size));
      });

      this.totalSizePercent = this.totalSize / 10;
    }
  }

  onSelectedFiles(event: any) {
    const files: File[] = event.currentFiles;
    this.images = this.imageProcessorService.createImagesFromFiles(files);

    this.images.forEach((image) => {
      this.totalSize += parseInt(this.formatSize(image.file.size));
    });

    this.totalSizePercent = this.totalSize / 10;

    if (this.totalSize > this.maxFileSize) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size exceeds limit' });
      this.images = [];
      this.totalSize = 0;
      this.totalSizePercent = 0;
    } else {
      this.imagesSelected.emit([...this.images, ...this.uploadedImages]);
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

  onRemoveImage(image: Image) {
    const updatedImages = this.images.filter(i => i !== image);
    this.images = updatedImages;
    this.imagesSelected.emit([...updatedImages, ...this.uploadedImages]);

    this.removeSize(image.file.size);
  }

  onRemoveUploadedImage(image: Image) {
    const updatedImages = this.uploadedImages.filter(i => i !== image);
    this.uploadedImages = updatedImages;
    this.imagesSelected.emit([...updatedImages, ...this.images]);

    this.removeSize(image.file.size);
  }

  removeSize(size: number) {
    this.totalSize -= parseInt(this.formatSize(size));
    this.totalSizePercent = this.totalSize / 10;
  }
}