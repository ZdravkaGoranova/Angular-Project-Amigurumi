import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  login(email: string, passord: string): void {
    //TO DO...

    this.userService.login();
    this.router.navigate(['/']);
  }
  submitHandler(form: NgForm): void {
    console.log(form.value)

    if (form.invalid) {
      return;
    }

    // form.setValue({
    //   fullName: '', email: '', password: '', gender: '',
    // })

    const value: { fullName: string; email: string; password: string; gender: string; } = form.value
    console.log({ value })
    console.log(value.email)
    console.log(value.fullName)
    console.log(value.gender)
    console.log(value.password)
  }
}
