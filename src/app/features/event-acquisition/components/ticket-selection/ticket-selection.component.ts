import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../../../core/models/event.model';
import { SharedModule } from '../../../../shared/modules/shared.module';


@Component({
  selector: 'ticket-selection',
  standalone: true,
  imports: [CommonModule, InputNumberModule, ButtonModule, FormsModule, DividerModule, SharedModule],
  templateUrl: './ticket-selection.component.html',
  styleUrl: './ticket-selection.component.scss'
})
export class TicketSelectionComponent {
  @Input() event!:Event;
  @Output() ticketsOp = new EventEmitter<number>()

  ticketsQtt:number = 0

  buttonDisable :boolean = true;

  buttonIsDisable(){
    if (this.ticketsQtt > 0) {
      this.buttonDisable = false     
    }else{
      this.buttonDisable = true 
    }
  }

  sideBarIsVisible(){ 
    this.ticketsOp.emit(this.ticketsQtt)
  }
}
