import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { EventService } from '../../services/event.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-event',
  standalone: true,
  imports: [
    SharedModule,
    CardModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    RatingModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './company-event.component.html',
  styleUrl: './company-event.component.scss',
  providers: [DatePipe]
})
export class CompanyEventComponent {
  @Input() event!: Event;
  @Output() removeEvent = new EventEmitter<string>();

  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private languageService: LanguageService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  dateFormat(date: Date): string {
    let format: string;

    if (this.languageService.getLanguage() === 'en-US') {
      format = 'MM/dd/yyyy, HH:mm';
    } else {
      format = 'dd/MM/yyyy, HH:mm';
    }

    return this.datePipe.transform(date, format) ?? '';
  }

  eventHasEnded(): boolean {
    return this.event.endTime!.getTime() < new Date().getTime();
  }

  openEventPage() {
    this.router.navigateByUrl('event/' + this.event.id)
  }

  openUpdatePage() {
    this.router.navigateByUrl('events/update/' + this.event.id)
  }

  async deleteEvent(e: any) {
    let translations = await this.languageService.getTranslations();

    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: translations.events.cancelDialog.message,
      header: translations.events.cancelDialog.header,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: translations.events.cancelDialog.acceptLabel,
      rejectLabel: translations.events.cancelDialog.rejectLabel,
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        let userId = this.authService.getUserId();

        // TODO: implement event removal
        // this.eventService.cancelEvent(userId, this.event.id!).subscribe({
        //   next: () => {
        //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event successfully deleted!' });
        //     this.removeEvent.emit(this.event.id!);
        //   },
        //   error: () => {
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to delete event, please try again later.' });
        //   }
        // });
      }
    });
  }

  getThumbnailImage(images: any): string {
    if (images.length) {
      return images[0].url;
    }

    return '/assets/images/img-not-found.jpg';
  }
}
