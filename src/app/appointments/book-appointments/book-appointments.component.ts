import { AppointmentsService } from './../appointments.service';
import { Appointment } from './../appointment.model';
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css'],
})
export class bookAppointment implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  private AppointmentSub: Subscription | undefined;
  constructor(public appointmentsService: AppointmentsService) {}

  // read/get appointments from backend server
  ngOnInit() {
    this.appointmentsService.getAppointments();
    this.AppointmentSub = this.appointmentsService
      .getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = [...appointments];
      });
  }
  ngOnDestroy() {
    this.AppointmentSub?.unsubscribe();
  }

  // create appointmets //TODO change to anAddAppointments
  onBookAppointment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // TODO change inputs to variables from form.value.name
    this.appointmentsService.addAppointments(
      '',
      'test_vendor',
      new Date(),
      '10:00-11:00',
      'test_client',
      true
    );
    console.log('Appointment has been added');
  }

  @Output() appointmentCreated = new EventEmitter<Appointment>();

  // send and receive to/from child components:

  //// dropdown select
  // send
  vendorsList: string[] = ['John Deere', 'Steve Jobs'];
  // get
  vendor_name: string = '';
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
  //TODO add/change method to integrate into appointmentsservice.
  // filteredAppointments: Appointment[] = [];
  // getfilteredAppointments(vendor_name, ) {
  //   if ((this.vendor_name !== '', this.vendor_name !== '')) {
  //     // this.AppointmentsService.getBookingTimeslots(vendor_name, chosenDate )   // TODO finish installing
  //     console.log('Test');
  //     // this.bookingTimeslots = // TODO update bookingTimeslots
  //   }
  // }

  // get
  timeSlot: Appointment = {
    id: null,
    vendor_name: '',
    appointment_time: new Date(),
    time_string: '',
    client_name: '',
    booked: true,
  };
  timestring: any;
  GetTimeSlot(time_slot: Appointment) {
    this.timeSlot = time_slot;
    console.log(this.timeSlot.appointment_time);
    // this.timestring = this.timeSlot.appointment_time.getFullYear();
    // this.test = this.timeSlot.appointment_time.toLocaleString();
    // console.log(this.timestring);
  }

  // // create appointment and send to database
  // onBookAppointment(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   // console.log('Test booking');

  //   const appointment: Appointment = {
  //     id: 'null',
  //     vendor_name: form.value.vendor_name,
  //     appointment_time: form.value.appointment_time,
  //     client_name: form.value.client_name,
  //     booked: true,
  //   };
  //   this.appointmentCreated.emit(appointment);
  // }
}
