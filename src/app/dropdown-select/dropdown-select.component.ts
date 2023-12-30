import { NgForm } from '@angular/forms';
import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
})
export class selectDropdown {
  // get variable value from parent component
  // get list of vendors to choose from, from parent component
  @Input() vendors_list: Array<string> = [];

  // send variable output to parent component
  @Output() vendorSelected = new EventEmitter<string>();
  onSelectVendor(vendor: string) {
    this.vendorSelected.emit(vendor);
  }
}
