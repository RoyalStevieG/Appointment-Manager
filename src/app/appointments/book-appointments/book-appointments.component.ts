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

  // create appointmets //
  message: string = '';
  onBookAppointment() {
    if (this.checkInputs() === false) {
      window.alert('Please enter all required information');
    } else {
      this.appointmentsService.addAppointments(
        '',
        this.vendor_name,
        this.chosenDate,
        this.time_string,
        'test_client',
        true
      );
      //TODO get value from appointmentsService
      window.alert('Appointment successfully booked.');
    } // end else block
  } // end onBookAppointment

  // check to make sure all inputs are populated //
  bInputsPopulated: boolean = true;
  checkInputs() {
    if (this.bVendorPicked === false || this.bDatePicked === false) {
      this.bInputsPopulated = false;
    } else {
      this.bInputsPopulated = true;
    }
    return this.bInputsPopulated;
  }

  @Output() appointmentCreated = new EventEmitter<Appointment>();

  // send and receive to/from child components: //

  //// dropdown select
  // send
  vendorsList: string[] = ['John Deere', 'Steve Jobs'];
  // get
  vendor_name: string = '';
  bVendorPicked: boolean = false;
  GetName(name: string) {
    this.vendor_name = name;
    console.log('Parent:Name ' + this.vendor_name); // used to test connection between child and parent components. Delete
    this.bVendorPicked = true;
    this.compareBookingTimes();
  }
  //// date-picker
  // send
  //TODO send weekdays off, other holidays
  // get
  chosenDate: Date = new Date();
  bDatePicked: boolean = false;
  GetDate(date_picked: Date) {
    console.log('Parent:Date ' + date_picked); // used to test connection between child and parent components. Delete
    this.chosenDate = date_picked;
    this.bDatePicked = true;
    this.compareBookingTimes();
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
  time_string: string = '';

  GetTimeString(time_string: string) {
    this.time_string = time_string;
    console.log(this.time_string);
    // this.timestring = this.timeSlot.appointment_time.getFullYear();
    // this.test = this.timeSlot.appointment_time.toLocaleString();
    // console.log(this.timestring);

    // TODO change later
    // this.time_string = '10:00 - 11:00';
  }

  // ----------------------------------------------------------------------------------------
  // timeslot picker stuff

  // bookingslots for all vendors.
  // who knows maybe in the future i'll let them choose their own working hours, at least they get to pick their own days..or is it not implemented yet?
  timeSlots = new Map([
    ['09:00-09:50', false],
    ['10:00-10:50', false],
    ['11:00-11:50', false],
    ['12:00-12:50', false],
    ['14:00-14:50', false],
    ['15:00-15:50', false],
    ['16:00-16:50', false],
    ['17:00-17:50', false],
  ]);

  // TODO filter appointments
  // filter by selected vendor_name and date
  filteredAppointments: Appointment[] = this.appointments;

  // check whether bookings have been made for this day, if so, change true/false values for display purposes
  compareBookingTimes() {
    if (this.filteredAppointments.length > 0 && this.checkInputs()) {
      this.filteredAppointments.forEach((element) => {
        // console.log(element.time_string); // testing TODO remove
        if (this.timeSlots.has(element.time_string)) {
          this.timeSlots.set(element.time_string, true);
        }
      });
    }
  } // end test
}
