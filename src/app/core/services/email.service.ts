import { Injectable } from '@angular/core';
import { sendEmail } from '../models/email.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url: string = "http://localhost:8080/notifications";


  constructor(private http: HttpClient) { }

  sendEmail(userId:string,email:sendEmail) {
    this.http.post(this.url+`/email/${userId}`, email).subscribe({
      next:(res) => console.log("email enviado"),
      error:(e)=> console.log(e)
    })
  }
}
