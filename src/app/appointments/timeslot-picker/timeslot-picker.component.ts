import { TimeSlot } from './../time-slot.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeslot-picker',
  templateUrl: './timeslot-picker.component.html',
  styleUrls: ['./timeslot-picker.component.css'],
})
export class timeslotPicker {
  @Input() dateSelected: Date = new Date();

  @Output() timeSlot = new EventEmitter<TimeSlot>();
  onSelectDate(timeSlot: TimeSlot) {
    // console.log(timeSlot.timeString);
    this.timeSlot.emit(timeSlot);

    // if (timeSlot.booked) {
    //   console.log(
    //     'Timeslot ' + timeSlot.timeString + ' has already been booked'
    //   );
    // } else
    //   console.log(
    //     'Test select: ' +
    //       timeSlot.start_time +
    //       ' ' +
    //       timeSlot.duration +
    //       ' ' +
    //       timeSlot.timeString +
    //       ' ' +
    //       timeSlot.booked
    //   );
  }

  times: TimeSlot[] = [
    {
      start_time: new Date('2015-03-25'),
      duration: '1h',
      timeString: '10:00 - 10:45',
      booked: true,
    },
    {
      start_time: new Date('2015-03-25'),
      duration: '1h',
      timeString: '11:00 - 11:45',
      booked: false,
    },
    {
      start_time: new Date('2015-03-25'),
      duration: '1h',
      timeString: '12:00 - 12:45',
      booked: true,
    },
  ];
  //   @Output() appointmentCreated = new EventEmitter<Appointment>();
}
