import { signUpcomponent } from './authentication/signUp/signUp.component';
import { logincomponent } from './authentication/login/login.component';
import { editAppointment } from './appointments/edit-appointments/edit-appointments.component';
import { bookAppointment } from './appointments/book-appointments/book-appointments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: bookAppointment },
  { path: 'new-booking', component: bookAppointment },
  { path: 'login', component: logincomponent },
  { path: 'signUp', component: signUpcomponent },
  { path: 'show-bookings', component: editAppointment },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
