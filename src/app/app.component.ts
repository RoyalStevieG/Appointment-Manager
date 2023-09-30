import { Component } from '@angular/core';
import { Appointment } from './appointments/appointment.model';
import { TimeSlot } from './appointments/time-slot.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  storedAppointments: Appointment[] = [];
  storedTimes: TimeSlot[] = [];

  onBookingAdded(appointment: Appointment) {
    this.storedAppointments.push(appointment);
    console.log(appointment);
  }

  // title = 'Appointment-Manager';
}
