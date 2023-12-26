import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDatepickerModule,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
})
export class datePicker {
  // set start and end of calendar to pick from.
  minDate: Date;
  maxDate: Date;

  constructor() {
    // can book a day to a month in advance
    // ie between today and a month from today
    this.minDate = new Date();
    this.minDate.setDate(new Date().getDate() + 1);
    this.maxDate = new Date();
    this.maxDate.setMonth(new Date().getMonth() + 1);
  }

  // adjust calender so only working days can be selected.
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  mydate = new Date();
  @Output() dateSelected = new EventEmitter<Date>();
  selectDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.mydate = new Date(event.value!);
    this.dateSelected.emit(this.mydate);
  }
}
