import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  @Input() product!: Product;
  @Input() productDesc!: string;

  products: Product[] = [];
  isLoading: boolean = true;
  private symbols: number = 250;

  // author
  descToShow: string;
  productDescLen: number;
  showReadMoreBtn: boolean = true;
  showHideBtn: boolean = false;
  imageIsShown: boolean = true;
  imageButtonTitle: string = 'Show Image';

  likeIsShown: boolean = false;
  likeButtonTitle: string = 'Like';


  constructor(private apiService: ApiService) {
    this.productDescLen = 0;
    this.descToShow = "";
  }
  ngOnInit(): void {

    this.apiService.getProducts().subscribe({
      next: (products) => {
        console.log({ products })
        this.products = products;
        this.isLoading = false;
      }
      , error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`)
      },
    })

  }
  // readMore(): void {
  //   this.productDescLen += this.symbols;
  //   if (this.productDescLen >= this.productDesc.length) {
  //     this.showReadMoreBtn = false;
  //     this.showHideBtn = true;
  //     this.descToShow = this.productDesc;
  //   } else {
  //     this.descToShow = this.productDesc.substr(0, this.productDescLen);

  //   }
  // }

  // toggleImage(): void {
  //   this.imageIsShown = !this.imageIsShown;
  //   this.imageButtonTitle = this.imageIsShown ? 'Hide Image' : 'Show Image';

  // }
  // toggleLike(): void {
  //   this.likeIsShown = !this.likeIsShown;
  //   this.likeButtonTitle = this.likeIsShown ? 'Like' : 'You already liked!';

  // }
  // hideDesc(): void {
  //   this.productDescLen = 0;
  //   this.descToShow = "";
  //   this.showReadMoreBtn = true;
  //   this.showHideBtn = false;
  // }

}

  // products!: Product[];

  // constructor(private apiService: ApiService) { }

  // ngOnInit(): void {

  //   this.apiService.getProducts().subscribe((products) => { console.log(products) })
  // }

