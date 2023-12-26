import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  private userUpdated = new Subject<User[]>();
  private userSession = { type: 'None', user: this.users[0] };
  private userSessionUpdated = new Subject<any>();

  private vendors = ['johndeere@gmail.com', 'stevejobs@gmail.com'];

  constructor(private http: HttpClient) {}

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  getUserSessionUpdateListener() {
    return this.userSessionUpdated.asObservable();
  }

  // Get all users //
  getAllUsers() {
    this.http
      .get<{ message: string; users: User[] }>(
        'http://localhost:3000/api/users'
      )
      .pipe(
        map((userData) => {
          return userData.users.map((user) => {
            return {
              _id: user._id,
              name: user.name,
              surname: user.surname,
              phone: user.phone,
              email: user.email,
              password: user.password,
            };
          });
        })
      )
      .subscribe((transformedUsers) => {
        this.users = transformedUsers;
        this.userUpdated.next([...this.users]);
        // console.log(this.users);
      });
    return this.users;
  }

  addUser(
    id: string,
    name: string,
    surname: string,
    phone: string,
    email: string,
    password: string
  ) {
    const user: User = {
      _id: id,
      name: name,
      surname: surname,
      phone: phone,
      email: email,
      password: password,
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/users', user)
      .subscribe((responseData) => {
        console.log(responseData.message); // logs responseData() to browser console
        this.users.push(user);
        this.userUpdated.next([...this.users]);
      });
  }

  loginUser(email: string) {
    this.http
      .get<{ message: string; users: User[] }>(
        'http://localhost:3000/api/users/' + email
      )
      .pipe(
        map((userData) => {
          return userData.users.map((user) => {
            return {
              _id: user._id,
              name: user.name,
              surname: user.surname,
              phone: user.phone,
              email: user.email,
              password: user.password,
            };
          });
        })
      )
      .subscribe((transformedUsers) => {
        var logUser = transformedUsers[0];

        this.userSession = { type: 'User', user: logUser };
        this.vendors.forEach((vendor) => {
          if (logUser.email.includes(vendor)) {
            // console.log('test');
            this.userSession = { type: 'Vendor', user: logUser };
          }
        });
        this.userSessionUpdated.next(this.userSession);
      });
  }

  getLoggedUser() {
    return this.userSession;
  }

  logOutUser() {
    this.userSession = { type: 'None', user: this.users[0] };
    this.userSessionUpdated.next(this.userSession);
  }
} // end of export class
