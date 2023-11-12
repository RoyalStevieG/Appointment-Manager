import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showBookComponent = true;
  showEditComponent = false;

  changeComponent() {
    if (this.showBookComponent === true) {
      this.showBookComponent = false;
      this.showEditComponent = true;
    } else if (this.showEditComponent === true) {
      this.showBookComponent = true;
      this.showEditComponent = false;
    }
  }

  // title = 'Appointment-Manager';
}
