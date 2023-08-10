import { Component, OnInit } from '@angular/core';
import { ErrorService } from './core/error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  title = 'Prodject-Amigorumi';
  errorMsg = '';

  constructor(private errorService: ErrorService) { }

  ngOnInit() { 
    this.errorService.apiError$$.subscribe((err: any) => {
   
      console.log(err.message);
      this.errorMsg = err.message;
    });
  }
}
