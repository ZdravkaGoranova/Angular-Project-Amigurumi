import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { ErrorService } from '../../core/error/error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  // user: any = {
  //   gender: 'male' // или 'female'
  // };

  errorMsg = '';
  successMsg = '';

  constructor(

    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {

  }

  register(fullName: string, email: string, password: string): void {

    this.userService.register(fullName, email, password);

    // this.errorService.apiError$$.subscribe((err: any) => {
    //   debugger;
    //   console.log(err.message)
    //   this.errorMsg = err.message;
    // })

    // console.log(form.value)
    //   if (form.invalid) {
    //     return;
    //   }
    //   form.setValue({
    //     fullName: '', email: '', password: '', gender: '',
    //   })

    // --Promise<void>/Observable
    // this.userService.register(fullName, email, password)
    // .subscribe(
    //   () => {
    //     this.successMsg = 'Registration Successful';
    //     this.router.navigate(['/auth/profile']);
    //   },
    //   (error) => {
    //     this.errorMsg = error.message;

    //     //Error component
    //     // this.errorService.setError(error);
    //     // this.router.navigate(['error'])
    //     // console.error(error.message);

    //     // alert('User registration failed!');
    //   }
    // );

  }
}

