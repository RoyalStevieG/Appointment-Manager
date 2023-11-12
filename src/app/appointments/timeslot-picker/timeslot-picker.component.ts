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
  // create transmitter to send data to parent component
  @Output() timeSlot = new EventEmitter<Appointment>();
  // on button click
  onSelectDate(timeSlot: Appointment) {
    // show error if timeslot already booked
    if (timeSlot.booked) {
      window.alert(
        'Timeslot ' +
          timeSlot.appointment_time +
          ' has already been booked, please choose another timeslot.'
      );
    } // if timeslot is not already booked
    else {
      // transmit selected timeslot to parent component(book-appointments)
      this.timeSlot.emit(timeSlot);
    }
  }
}
