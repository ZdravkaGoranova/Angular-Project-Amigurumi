import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const footer = document.querySelector('footer');
    
    if (footer) {
      const threshold = window.innerHeight - footer.clientHeight;

      if (window.pageYOffset >= threshold) {
        footer.classList.add('sticky-visible');
      } else {
        footer.classList.remove('sticky-visible');
      }
    }
  }
}
