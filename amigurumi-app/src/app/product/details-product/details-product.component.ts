import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
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

  constructor(private activeRoute: ActivatedRoute, ) {
    console.log(this.activeRoute.snapshot.data);
    this.activeRoute.params.subscribe((v) => console.log(v))

    this.productDescLen = 0;
    this.descToShow = "";
  }
  ngOnInit(): void {

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
