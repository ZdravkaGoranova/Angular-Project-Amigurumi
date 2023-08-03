import { Component } from '@angular/core';
import { UserService } from '../user.service';

import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/validators/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  constructor(
    private userService: UserService,
  ) { }

  login(email: string, password: string): void {

    this.userService.login(email, password);

    //  this.userService.login( email, password).subscribe(()=>{
    //     this.router.navigate(['/']);
    //   });
    //   this.router.navigate(['/']);
    // }

  }
}

