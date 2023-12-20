import { HttpClient } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
      .pipe(
        map((appointmentData) => {
          return appointmentData.appointments.map((appointment) => {
            return {
              id: appointment.id,
              vendor_name: appointment.vendor_name,
              appointment_time: appointment.appointment_time,
              time_string: appointment.time_string,
              client_name: appointment.client_name,
              booked: appointment.booked,
            };
          });
        })
      )
      .subscribe((transformedAppointment) => {
        this.appointments = transformedAppointment;
        this.appointmentUpdated.next([...this.appointments]);
        // .subscribe((AppointmentData) => {
        // this.appointments = AppointmentData.appointments;
        // this.appointmentUpdated.next([...this.appointments]);
      });
    return this.appointments;
  }

  addAppointments(
    id: string,
    vendor_name: string,
    appointment_time: Date,
    time_string: string,
    client_name: string,
    booked: boolean
  ) {
    const appointment: Appointment = {
      id: null,
      vendor_name: vendor_name,
      appointment_time: appointment_time,
      time_string: time_string,
      client_name: client_name,
      booked: booked,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/appointments',
        appointment
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.appointments.push(appointment);
        this.appointmentUpdated.next([...this.appointments]);
      });
  }

  getAppointmentUpdateListener() {
    return this.appointmentUpdated.asObservable();
  }
}
