import { Component } from '@angular/core';
import { Appointment } from './appointments/appointment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  storedAppointments: Appointment[] = [];

  title = 'Appointment-Manager';
}
