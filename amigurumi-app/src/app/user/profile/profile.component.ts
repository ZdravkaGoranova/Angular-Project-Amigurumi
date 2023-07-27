import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

interface Profile {
  fullName: string;
  email: string;
  gender: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = {
    gender: 'male' // или 'female'
  };
  isEditMode: boolean = false;

  // profileDetails: Profile = {
  //   fullName: '',
  //   email: '',
  //   gender: ''
  // };
  profileDetails: Profile = {
    fullName: "John",
    email: "john.doe@gmail.com",
    gender: "male",
  };
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfileHandler(form: NgForm): void {
    console.log(form.value)
 

    if (form.invalid) {
      return;
    }
    // this.router.navigate(['/']);

    this.profileDetails = { ...form.value } as Profile;
    this.toggleEditMode();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get fullName(): string {
    // return this.userService.user?.email|| '';
    return this.userService.user?.fullName || '';
  }
  get email(): string {
    return this.userService.user?.email || '';
  }

  // get gender(): string {
   
  //   return this.userService.user?.gender || '';
  // }
  // get isMale(): boolean {
  //   return this.userService.isMale;
  // }
  get isMale(): boolean {
    return this.user.gender === 'male';
  }
}
