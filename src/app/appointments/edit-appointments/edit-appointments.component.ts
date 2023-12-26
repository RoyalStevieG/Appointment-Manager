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
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
})
export class editAppointment implements OnInit, OnDestroy {
  // get input from server
  appointments: Appointment[] = [];
  loggeduser: any = {};
  private AppointmentSub: Subscription | undefined;
  private UserSessionSub: Subscription | undefined;
  constructor(
    public appointmentsService: AppointmentsService,
    public usersService: UsersService,
    private router: Router
  ) {}

  // read/get appointments from backend server
  ngOnInit() {
    // get appointments
    this.appointmentsService.getAppointments();
    this.AppointmentSub = this.appointmentsService
      .getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = [...appointments];
        this.appointments.sort((a, b) =>
          a.appointment_time < b.appointment_time
            ? 1
            : a.appointment_time > b.appointment_time
            ? 1
            : 0
        );
      });
    // get userSession
    this.loggeduser = this.usersService.getLoggedUser();
    this.UserSessionSub = this.usersService
      .getUserSessionUpdateListener()
      .subscribe((UserSession: any) => {
        this.loggeduser = UserSession;
      });
    // check if user is authorized for webpage then redirect if needed.
    if (this.loggeduser['type'] == 'User') {
      this.router.navigate(['/new-booking']);
    } else if (this.loggeduser['type'] == 'None') {
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy() {
    this.AppointmentSub?.unsubscribe();
    this.UserSessionSub?.unsubscribe();
  }

  onDelete(appointmentId: string | null) {
    this.appointmentsService.deleteAppointment(appointmentId);
  }
}
