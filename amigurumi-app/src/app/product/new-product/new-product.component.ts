import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  user: any = {
    skillLevel: 'easy' ,
    category: 'baby' 
  };

  constructor(

    private router: Router

  ) { }

  submitHandler(form: NgForm): void {
    console.log(form.value)

    if (form.invalid) {
      return;
    }
   
    this.router.navigate(['/products']);
    // form.setValue({
    //   fullName: '', email: '', password: '', gender: '',
    // })

    const value: { title: string; description: string; skillLevel: string; category: string; } = form.value
    console.log({ value })
    console.log(value.description)
    console.log(value.title)
    console.log(value.category)
    console.log(value.skillLevel)
  }
}
