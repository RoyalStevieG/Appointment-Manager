import { TimeSlot } from './../time-slot.model';
import { Appointment } from './../appointment.model';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css'],
})
export class bookAppointment {
  @Output() appointmentCreated = new EventEmitter<Appointment>();

  // send and receive to/from child components:

  //// dropdown select
  // send
  vendorsList: string[] = ['John Deere', 'Steve Jobs'];
  // get
  vendor_name: string = 'TestValue'; // TODO delete
  GetName(name: string) {
    this.vendor_name = name;
    console.log('Parent:Name ' + this.vendor_name); // used to test connection between child and parent components. Delete
  }
  //// date-picker
  // send
  //TODO send weekdays off, other holidays
  // get
  chosenDate: Date = new Date();
  GetDate(date_picked: Date) {
    console.log('Parent:Date ' + date_picked); // used to test connection between child and parent components. Delete
    this.chosenDate = date_picked;
  }

  //// timeslot-picker
  // send
  // get
  timeSlot: TimeSlot = {
    start_time: new Date(),
    duration: '',
    timeString: '',
    booked: true,
  };
  GetTimeSlot(time_slot: TimeSlot) {
    this.timeSlot = time_slot;
    console.log(time_slot.timeString);
  }

  onBookAppointment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log('Test booking');

    const appointment: Appointment = {
      vendor_name: form.value.vendor_name,
      appointment_time: form.value.appointment_time,
      client_name: form.value.client_name,
    };
    this.appointmentCreated.emit(appointment);
  }
}
