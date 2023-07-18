import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {
    gender: 'male' // или 'female'
  };


  //another way to get register form whithout passing it as a parameter of the callback
  // @ViewChild('registerForm') registerForm: NgForm | undefined;

  // submitHandler(): void {
  //   if (!this.registerForm) {
  //     return
  //   }
  //   const form = this.registerForm;
  ngOnInit(): void {
    //will be render only the static contect whith the dynamic components
    // this.registerForm?.valueChanges?.subscribe(console.log);
  }
  ngAfterViewInit(): void {
    // will be render the final content 

    // if (this.registerForm) {
    //   this.registerForm.form.valueChanges.subscribe((x) => {
    //     console.log(x);
    //   })
    // }

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
