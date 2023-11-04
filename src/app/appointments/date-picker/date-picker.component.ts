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
    // can book 1 day to 1 month in advance
    this.minDate = new Date();
    this.minDate.setDate(new Date().getDate() + 1);
    this.maxDate = new Date();
    this.maxDate.setMonth(new Date().getMonth() + 1);
  }

  // TODO change 0 and 6 to reflect days chosen by vendors
  // adjust calender so only working days can be selected.
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
    // idea: return if day not in list or day !== 0 && day !== 6
  };

  @Input() vendorSelected: string = '';

  mydate = new Date();
  @Output() dateSelected = new EventEmitter<Date>();
  selectDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.mydate = new Date(event.value!);
    // console.log(this.mydate); // delete
    this.dateSelected.emit(this.mydate);
    // console.log(this.vendorSelected); // displays selected vendor
  }
}
