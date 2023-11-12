import { HttpClient } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private appointments: Appointment[] = [];
  private appointmentUpdated = new Subject<Appointment[]>();

  constructor(private http: HttpClient) {}

  getAppointments() {
    this.http
      .get<{ message: string; appointments: Appointment[] }>(
        'http://localhost:3000/api/appointments'
      )
      .subscribe((AppointmentData) => {
        this.appointments = AppointmentData.appointments;
        this.appointmentUpdated.next([...this.appointments]);
      });
    return this.appointments;
  }

  addAppointments(
    id: string,
    vendor_name: string,
    appointment_time: Date,
    timestring: string,
    client_name: string,
    booked: boolean
  ) {
    const appointment: Appointment = {
      id: null,
      vendor_name: vendor_name,
      appointment_time: appointment_time,
      time_string: timestring,
      client_name: client_name,
      booked: booked,
    };
    this.appointments.push(appointment);
    this.appointmentUpdated.next([...this.appointments]);
  }

  getAppointmentUpdateListener() {
    return this.appointmentUpdated.asObservable();
  }
}
