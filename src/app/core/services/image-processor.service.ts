import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Image, ImageResponse } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessorService {

  constructor(private sanitizer: DomSanitizer) { }

  createImagesFromFiles(files: File[]): Image[] {
    const images: Image[] = files.map(file => {
      const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      return { file, url };
    });

    return images;
  }

  createImagesFromResponse(imagesResponse: ImageResponse[]): Image[] {
    const images: Image[] = [];

    for (let i = 0; i < imagesResponse.length; i++) {
      images.push(this.createImage(imagesResponse[i]));
    }

    return images;
  }

  createImage(imageResponse: ImageResponse): Image {
    const imageBlob = this.dataURItoBlob(imageResponse.picByte, imageResponse.type);
    const imageFile = new File([imageBlob], imageResponse.name, { type: imageResponse.type });

    return {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };
  }

  dataURItoBlob(picBytes: string, imageType: string) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
