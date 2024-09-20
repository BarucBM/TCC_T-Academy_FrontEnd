import { Component, Input } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Event } from '../../../models/Event';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'ticket-selection',
  standalone: true,
  imports: [CommonModule, InputNumberModule, ButtonModule, FormsModule, DividerModule],
  templateUrl: './ticket-selection.component.html',
  styleUrl: './ticket-selection.component.scss'
})
export class TicketSelectionComponent {
  @Input() event!:Event;

  ticketsQtt:number = 0
  buttonDisable :boolean = true;

  buttonIsDisable(){
    if (this.ticketsQtt > 0) {
      this.buttonDisable = false     
    }else{
      this.buttonDisable = true 
    }
  }
}
