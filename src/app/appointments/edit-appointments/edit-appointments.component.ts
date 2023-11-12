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
  // get input from parent component
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
}
