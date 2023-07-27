import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/validators/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  // email: string = '';
  // password: string = '';

  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  login(email: string, password: string): void {
    if (email == '') {
      alert('Plese enter email')
      return;
    }

    if (password == '') {
      alert('Plese enter password')
      return;
    }

    this.userService.login(email, password);
    // this.email = '';
    // this.password = '';

    // this.userService.login( email, password).subscribe(()=>{
    //   this.router.navigate(['/']);
    // });
    // this.router.navigate(['/']);
  }
  submitHandler(form: NgForm): void {
    console.log(form.value)

    if (form.invalid) {
      return;
    }

    // form.setValue({
    //   fullName: '', email: '', password: '', gender: '',
    // })

    const { email, password } = form.value
    // const value: { fullName: string; email: string; password: string; gender: string; } = form.value

    console.log(email);
    console.log(password);

    // console.log({ value })
    // console.log(value.fullName)
    // console.log(value.gender)

    // this.userService.login( email, password).subscribe(()=>{
    //   this.router.navigate(['/']);
    // });

  }
}
