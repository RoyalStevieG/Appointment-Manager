import { Router } from '@angular/router';
import { UsersService } from './../../authentication/users.service';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css'],
})
export class bookAppointment implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  loggeduser: any = {};
  private AppointmentSub: Subscription | undefined;
  private FilteredAppointmentSub: Subscription | undefined;
  private UserSessionSub: Subscription | undefined;
  constructor(
    public appointmentsService: AppointmentsService,
    public usersService: UsersService,
    private router: Router
  ) {}

  // get data from backend server
  ngOnInit() {
    // get userSession
    this.loggeduser = this.usersService.getLoggedUser();
    this.UserSessionSub = this.usersService
      .getUserSessionUpdateListener()
      .subscribe((UserSession: any) => {
        this.loggeduser = UserSession;
      });
    // check if user is authorized for webpage then redirect if needed.
    if (this.loggeduser['type'] == 'None') {
      this.router.navigate(['/login']);
    }

    // get filtered appointments
    this.appointmentsService.getFilteredAppointments(
      this.loggeduser['user']._id
    );
    this.FilteredAppointmentSub = this.appointmentsService
      .getFilteredAppointmentUpdateListener()
      .subscribe((filteredAppointments: Appointment[]) => {
        this.filteredAppointments = [...filteredAppointments];
      });

    // get all appointments
    this.appointmentsService.getAppointments();
    this.AppointmentSub = this.appointmentsService
      .getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = [...appointments];
      });
  }

  ngOnDestroy() {
    this.AppointmentSub?.unsubscribe();
    this.UserSessionSub?.unsubscribe();
  }

  // my functions //
  // create appointments //
  message: string = '';
  onBookAppointment() {
    var clientId = this.loggeduser['user']._id;
    var clientName =
      this.loggeduser['user'].name + ' ' + this.loggeduser['user'].surname;
    if (this.checkInputs() === false) {
      window.alert('Please enter all required information');
    } else {
      this.appointmentsService.addAppointments(
        '',
        this.vendor_name,
        this.chosenDate,
        this.time_string,
        clientId,
        clientName
      );
      window.alert('Appointment booked.');
    } // end else block
  } // end onBookAppointment

  // delete appointments //
  onDelete(appointmentId: string | null) {
    if (
      window.confirm('Are you sure you want to cancel your appointment?') ==
      true
    ) {
      this.appointmentsService.deleteAppointment(appointmentId);
    }
  }

  // check to make sure all inputs are populated //
  bInputsPopulated: boolean = false;
  checkInputs() {
    if (this.bVendorPicked === false || this.bDatePicked === false) {
      this.bInputsPopulated = false;
    } else {
      this.bInputsPopulated = true;
    }
    return this.bInputsPopulated;
  } // end checkinputs()

  // // send and receive to/from child components: // //
  //// dropdown vendor select
  // send
  vendorsList: string[] = ['John Deere', 'Steve Jobs'];
  // get
  vendor_name: string = '';
  bVendorPicked: boolean = false;
  GetName(name: string) {
    this.vendor_name = name;
    this.bVendorPicked = true;
    this.compareBookingTimes();
  }
  //// date-picker
  // get
  chosenDate: Date = new Date();
  bDatePicked: boolean = false;
  GetDate(date_picked: Date) {
    this.chosenDate = date_picked;
    this.bDatePicked = true;
    this.compareBookingTimes();
  }

  //// timeslot-picker
  // send
  timeSlots = new Map();
  // get
  time_string: string = '';
  GetTimeString(time_string: string) {
    this.time_string = time_string;
    console.log(this.time_string);
    // adjust chosenDate to include time
    this.chosenDate.setHours(Number.parseInt(this.time_string.slice(0, 2)));
    // call bookappointment
    this.onBookAppointment();
  }

  // ----------------------------------------------------------------------------------------
  // timeslot picker stuff

  // check whether bookings have been made for this day, if so, change true/false values for display purposes
  // update list sent to timeslot picker (buttons to select timeslots)
  compareBookingTimes() {
    // set bookingslots for all vendors
    this.timeSlots = new Map([
      ['09:00-09:50', false],
      ['10:00-10:50', false],
      ['11:00-11:50', false],
      ['12:00-12:50', false],
      ['14:00-14:50', false],
      ['15:00-15:50', false],
      ['16:00-16:50', false],
      ['17:00-17:50', false],
    ]);
    if (this.checkInputs()) {
      this.appointments.forEach((element) => {
        // window.alert(element.appointment_time + ' : ' + this.chosenDate);
        if (
          element.vendor_name == this.vendor_name &&
          element.appointment_time.toDateString() ==
            this.chosenDate.toDateString()
        ) {
          // window.alert(element.appointment_time);
          // window.alert(element.appointment_time + ' ' + this.chosenDate);
          if (this.timeSlots.has(element.time_string)) {
            this.timeSlots.set(element.time_string, true);
          }
        }
      });
    }
  } // end compareBookingTimes
}
