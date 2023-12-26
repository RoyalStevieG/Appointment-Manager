import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../authentication/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggeduser: any = {};
  private UserSessionSub: Subscription | undefined;
  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.loggeduser = this.usersService.getLoggedUser();
    this.UserSessionSub = this.usersService
      .getUserSessionUpdateListener()
      .subscribe((UserSession: any) => {
        this.loggeduser = UserSession;
      });
  }

  ngOnDestroy() {
    this.UserSessionSub?.unsubscribe();
  }

  onSignOut() {
    this.usersService.logOutUser();
    this.router.navigate(['/login']);
  }
}
