import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get fullName(): string {
    return this.userService.user?.fullName || '';
  }
  get email(): string {
    return this.userService.user?.email || '';
  }

  get gender(): string {
    return this.userService.user?.gender || '';
  }
  get isMale(): boolean {
    return this.userService.isMale;
  }
}
