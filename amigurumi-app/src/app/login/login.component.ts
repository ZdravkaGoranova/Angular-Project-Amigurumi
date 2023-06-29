// import { Component, inject } from '@angular/core';
// import {FormControl, Validators, FormsModule, ReactiveFormsModule,FormBuilder} from '@angular/forms';
// import {NgIf} from '@angular/common';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf],
// })
// export class LoginComponent {

//   email = new FormControl('', [Validators.required, Validators.email]);

//   getErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'You must enter a value';
//     }

//     return this.email.hasError('email') ? 'Not a valid email' : '';
//   }


// }

import { Component, inject } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule,FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}







