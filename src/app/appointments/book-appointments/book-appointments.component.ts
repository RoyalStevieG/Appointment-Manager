import { TimeSlot } from './../time-slot.model';
import { Appointment } from './../appointment.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css'],
})
export class bookAppointment {
  times = [{ slot: '10:00-10:45' }, { slot: '11:00-11:45' }];
  @Output() appointmentCreated = new EventEmitter<Appointment>();

  onSelectDate(timeSlot: string) {
    console.log('Test select: ' + timeSlot);
  }

  onBookAppointment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('Test booking');

    const appointment: Appointment = {
      vendor_name: form.value.vendor_name,
      appointment_time: form.value.appointment_time,
      client_name: form.value.client_name,
    };
    this.appointmentCreated.emit(appointment);
  }
}
