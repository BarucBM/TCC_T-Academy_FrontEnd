import { SafeUrl } from "@angular/platform-browser";

export interface Image {
  file: File,
  url: SafeUrl
}

export interface ImageResponse {
  id: string
  name: string
  type: string
  picByte: string;
  createdAt: Date;
}