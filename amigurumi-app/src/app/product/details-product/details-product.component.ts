import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { UserService } from 'src/app/user/user.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  private symbols: number = 250;
  // product!: Product[] | undefined;
  // @Input() product!: Product;
  @Input() productDesc!: string;
  product: Product | null = null;

  descToShow: string;
  productDescLen: number;
  showReadMoreBtn: boolean = true;
  showHideBtn: boolean = false;
  imageIsShown: boolean = true;
  imageButtonTitle: string = 'Show Image';

  likeIsShown: boolean = false;
  likeButtonTitle: string = 'Like';

  isDeleteProduct: boolean = false;

  constructor(

    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {



    this.activatedRoute.params.subscribe((v) => console.log(v))

    this.productDescLen = 0;
    this.descToShow = "";
  }
  ngOnInit(): void {
    this.fetchTheme();
  }
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  async fetchTheme(): Promise<void> {
    debugger;
    const id = this.activatedRoute.snapshot.params['productId'];
    try {
      this.product = await this.apiService.getCurrentProduct(id)!;
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
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

  editProduct(): void {

  }
  deleteProduct(): void {

  }
}
