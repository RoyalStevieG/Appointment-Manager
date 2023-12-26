import { UsersService } from './../users.service';
import { Subscription } from 'rxjs';
import { User } from './../user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class logincomponent implements OnInit, OnDestroy {
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

  onLogin(form: NgForm) {
    var email = form.value['email'];
    var password = form.value['password'];

    this.users.forEach((user) => {
      if (user.email == email) {
        if (user.password == password) {
          this.usersService.loginUser(email);
          window.alert('Sucessfully signed in.');
          this.router.navigate(['/']);
        } else {
          this.errorText = 'Password is incorrect, please try again.';
        }
        return;
      }
      this.errorText = "User doesn't exist, please sign up to log in.";
    });
  }
}
