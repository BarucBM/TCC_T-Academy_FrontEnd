import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
 permission :string = ""
  constructor() { }

  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        this.permission = permission;
      });
    }
  }

  sendNotification(title: string, options?: NotificationOptions): void {
    this.requestPermission()
    
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else {
      
    }
  }
}
