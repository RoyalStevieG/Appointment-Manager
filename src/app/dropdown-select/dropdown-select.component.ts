import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
})
export class selectDropdown {
  vendors = [{ name: 'John', surname: 'Deer' }];
}
