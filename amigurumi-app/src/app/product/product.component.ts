import { Component, Input } from '@angular/core';
import { Product } from '../types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  private symbols: number = 250;

  @Input() product!: Product;
  @Input() productDesc!: string;
  // author
  
  descToShow: string;
  productDescLen: number;
  showReadMoreBtn: boolean = true;
  showHideBtn: boolean = false;
  imageIsShown: boolean = true;
  imageButtonTitle: string = 'Show Image';

  likeIsShown: boolean = false;
  likeButtonTitle: string = 'Like';

  constructor() {
    this.productDescLen = 0;
    this.descToShow = "";
  }
  readMore(): void {
    this.productDescLen += this.symbols;
    if (this.productDescLen >= this.productDesc.length) {
      this.showReadMoreBtn = false;
      this.showHideBtn = true;
      this.descToShow = this.productDesc;
    } else {
      this.descToShow = this.productDesc.substr(0, this.productDescLen);

    }
  }

  toggleImage(): void {
    this.imageIsShown = !this.imageIsShown;
    this.imageButtonTitle = this.imageIsShown ? 'Hide Image' : 'Show Image';

  }
  toggleLike(): void {
    this.likeIsShown = !this.likeIsShown;
    this.likeButtonTitle = this.likeIsShown ? 'Like' : 'You already liked!';

  }
  hideDesc(): void {
    this.productDescLen = 0;
    this.descToShow = "";
    this.showReadMoreBtn = true;
    this.showHideBtn = false;
  }
}
