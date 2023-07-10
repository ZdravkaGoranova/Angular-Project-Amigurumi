import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | undefined;
  USER_KYE = '[user]';


  get isLogged(): boolean {
    return !!this.user;
  }

  constructor() {
    try {
      const lsUser = localStorage.getItem(this.USER_KYE) || '';
      this.user = JSON.parse(lsUser);

    } catch (error) {
      this.user = undefined;
    }
  }
  login(): void {
    this.user = {
      email: 'niki@abv.bg',
      firstName: 'Niki',
    };

    localStorage.setItem(this.USER_KYE, JSON.stringify(this.user))
  }
  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KYE);
  }


}
