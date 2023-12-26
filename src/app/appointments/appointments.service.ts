import { HttpClient } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private appointments: Appointment[] = [];
  private appointmentUpdated = new Subject<Appointment[]>();
  private filteredAppointments: Appointment[] = [];
  private filteredAppointmentUpdated = new Subject<Appointment[]>();

  constructor(private http: HttpClient) {}

  getAppointmentUpdateListener() {
    return this.appointmentUpdated.asObservable();
  }

  getFilteredAppointmentUpdateListener() {
    return this.filteredAppointmentUpdated.asObservable();
  }

  // Get all appointments //
  getAppointments() {
    this.http
      .get<{ message: string; appointments: Appointment[] }>(
        'http://localhost:3000/api/appointments'
      )
      .pipe(
        map((appointmentData) => {
          return appointmentData.appointments.map((appointment) => {
            return {
              _id: appointment._id,
              vendor_name: appointment.vendor_name,
              appointment_time: new Date(appointment.appointment_time),
              time_string: appointment.time_string,
              client_id: appointment.client_id,
              client_name: appointment.client_name,
            };
          });
        })
      )
      .subscribe((transformedAppointment) => {
        this.appointments = transformedAppointment;
        this.appointmentUpdated.next([...this.appointments]);
      });
  }

  // Get Filtered appointments //
  getFilteredAppointments(clientID: string | null) {
    this.http
      .get<{ message: string; appointments: Appointment[] }>(
        'http://localhost:3000/api/appointments/' + clientID
      )
      .pipe(
        map((appointmentData) => {
          return appointmentData.appointments.map((appointment) => {
            return {
              _id: appointment._id,
              vendor_name: appointment.vendor_name,
              appointment_time: new Date(appointment.appointment_time),
              time_string: appointment.time_string,
              client_id: appointment.client_id,
              client_name: appointment.client_name,
            };
          });
        })
      )
      .subscribe((transformedAppointment) => {
        this.filteredAppointments = transformedAppointment;
        this.filteredAppointmentUpdated.next([...this.filteredAppointments]);
      });
  }

  // addAppointments //
  addAppointments(
    id: string,
    vendor_name: string,
    appointment_time: Date,
    time_string: string,
    client_id: string,
    client_name: string
  ) {
    const appointment: Appointment = {
      _id: id,
      vendor_name: vendor_name,
      appointment_time: appointment_time,
      time_string: time_string,
      client_id: client_id,
      client_name: client_name,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/appointments',
        appointment
      )
      .subscribe((responseData) => {
        console.log(responseData.message); // logs responseData() to browser console
        this.appointments.push(appointment);
        this.appointmentUpdated.next([...this.appointments]);
        this.filteredAppointments.push(appointment);
        this.filteredAppointmentUpdated.next([...this.filteredAppointments]);
      });
  }

  // Delete appointments //
  deleteAppointment(appointmentId: string | null) {
    this.http
      .delete('http://localhost:3000/api/appointments/' + appointmentId)
      .subscribe((responseData) => {
        console.log(responseData);
        const updatedPosts = this.appointments.filter(
          (post) => post._id !== appointmentId
        );
        this.appointments = updatedPosts;
        this.appointmentUpdated.next([...this.appointments]);
        const updatedFilteredPosts = this.filteredAppointments.filter(
          (post) => post._id !== appointmentId
        );
        this.filteredAppointments = updatedFilteredPosts;
        this.filteredAppointmentUpdated.next([...this.filteredAppointments]);
      });
  }
} // end of export class
