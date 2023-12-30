import { UsersService } from './../users.service';
import { Subscription } from 'rxjs';
import { User } from './../user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class signUpcomponent {
  // variables
  users: User[] = [];
  errorText = '';
  private UserSub: Subscription | undefined;
  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.usersService.getAllUsers();
    this.UserSub = this.usersService
      .getUserUpdateListener()
      .subscribe((users: User[]) => {
        this.users = [...users];
      });
  }
  ngOnDestroy() {
    this.UserSub?.unsubscribe();
  }

  onSignUp(form: NgForm) {
    var bFlag = true;
    var name = form.value['name'];
    var surname = form.value['surname'];
    var phone = form.value['phone'];
    var email = form.value['email'];
    var password = form.value['password'];

    this.users.every((user) => {
      if (user.email == email) {
        this.errorText =
          'There is already a user with this email, would you like to log in instead?';
        bFlag = false;
        return;
      } else if (user.phone == phone) {
        this.errorText =
          'There is already a user with this phone number, would you like to log in instead?';
        bFlag = false;
        return;
      } else if (form.invalid) {
        bFlag = false;
        this.errorText = 'Please fill out all information';
      }
    });

    if (bFlag) {
      this.usersService.addUser('', name, surname, phone, email, password);
      setTimeout(() => {
        this.usersService.loginUser(email);
      }, 200); // sleep to ensure user is created before attempting to log them in
      setTimeout(() => {
        window.alert('Sucessfully signed up.');
        this.router.navigate(['/']);
      }, 200); // sleep to give enough time for backend to register adduser and login.
    }
  }
}
