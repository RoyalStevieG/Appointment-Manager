import { map } from 'rxjs/operators';
import { Appointment } from '../appointment.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeslot-picker',
  templateUrl: './timeslot-picker.component.html',
  styleUrls: ['./timeslot-picker.component.css'],
})
export class timeslotPicker {
  // get input from parent component
  @Input() filteredAppointments: Appointment[] = [];
  @Input() timeSlots = new Map();
  // create transmitter to send data to parent component
  @Output() timeSlot = new EventEmitter<string>();

  // bookingslots for all vendors.

  // timeSlots = new Map([
  //   ['09:00-09:50', false],
  //   ['10:00-10:50', false],
  //   ['11:00-11:50', false],
  //   ['12:00-12:50', false],
  //   ['14:00-14:50', false],
  //   ['15:00-15:50', false],
  //   ['16:00-16:50', false],
  //   ['17:00-17:50', false],
  // ]);

  // on button click
  onSelectDate(timeSlot: string) {
    this.timeSlot.emit(timeSlot);
  }
}
