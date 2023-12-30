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
    var i = 0;
    var bFlag = true;

    if (form.invalid) {
      this.errorText = 'Please fill out all information';
      return;
    } else {
      while (i < this.users.length && bFlag == true) {
        if (this.users[i].email == email) {
          if (this.users[i].password == password) {
            this.usersService.loginUser(email);
            setTimeout(() => {
              window.alert('Sucessfully logged in.');
              this.router.navigate(['/']);
            }, 200); // sleep to give enough time for backend to register and login.
            bFlag = false;
            return;
          } else {
            // password is incorrect
            this.errorText = 'Password is incorrect, please try again.';
            bFlag = false;
            return;
          } // end passward check
        } // end email check
        // end of while loop, i is increased
        i++;
      } // end while block
      // if no user is logged in:
      this.errorText = "User doesn't exist, please sign up first.";
    } // end if form.invalid else block
  } // end onLogin
}
