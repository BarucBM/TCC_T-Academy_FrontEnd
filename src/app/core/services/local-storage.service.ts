import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number = 0;
  clear(): void {}
  getItem(key: string): string | null {return null;}
  key(index: number): string | null {return null;}
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  isBrowser = new BehaviorSubject<boolean>(false);
  private storage: Storage;
  [name: string]: any;
  length: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = new LocalStorage();
    this.isBrowser.next(isPlatformBrowser(platformId));

    this.isBrowser.subscribe(isBrowser => {
      if (isBrowser) {
        this.storage = localStorage;
      }
    });
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}