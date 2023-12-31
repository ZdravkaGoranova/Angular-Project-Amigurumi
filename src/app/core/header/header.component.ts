import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get fullName(): string {
    // return this.userService.user?.email|| '';
    return this.userService.user?.fullName || '';
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  // logout(): void {
  //   this.userService.logout().subscribe({
  //     next: () => {
  //       this.router.navigate(['/auth/login']);
  //     }error: () => {
  //       this.router.navigate(['/auth/login']);
  //     }
  //   }

  //   );

  // }
}
