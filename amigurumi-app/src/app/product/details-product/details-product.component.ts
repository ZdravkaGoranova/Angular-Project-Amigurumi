import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { UserService } from 'src/app/user/user.service';
import { Firestore, getFirestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc, getDocs } from '@angular/fire/firestore';

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

  isOwnerStatus: boolean = false;


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
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
  ) {



    // this.activatedRoute.params.subscribe((v) => console.log(v))

    this.productDescLen = 0;
    this.descToShow = "";
  }
  async ngOnInit(): Promise<void> {
    this.fetchTheme();
    await this.checkIsOwner();
    this.isOwner()
    console.log(this.isOwner())
  }

  async checkIsOwner(): Promise<void> {
    const id = this.activatedRoute.snapshot.params['productId'];
    const product = await this.apiService.getCurrentProduct(id);
    const lockedUserId = this.userService.user?.id;
    this.isOwnerStatus = this.userService.isLogged && product?.ownerId === lockedUserId;
    console.log(this.isOwnerStatus);
  }
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  async isOwner(): Promise<boolean> {
    const id = this.activatedRoute.snapshot.params['productId'];
    const productOwner = await this.apiService.getCurrentProductOwner(id);
    const lockedUserId = this.userService.user?.id;
    this.isOwnerStatus = this.userService.isLogged && productOwner == lockedUserId;
    console.log(productOwner === lockedUserId);
    console.log(this.isOwnerStatus);

    return this.userService.isLogged && productOwner == lockedUserId;
  }

  async fetchTheme(): Promise<void> {

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

  async editProduct(): Promise<void> {
    const id = this.activatedRoute.snapshot.params['productId'];

    const collectionInstance = collection(this.firestore, 'products');

    const docRef = doc(collectionInstance, id);


    const washingtonRef = doc(collectionInstance, id);

    await updateDoc(washingtonRef, {
      capital: true
    });

  }

  deleteProduct(): void {
    const id = this.activatedRoute.snapshot.params['productId'];

    this.apiService.deleteProducts(id)
  
    this.router.navigate(['/profile']);
  }
  async lickedProduct(): Promise<void> {

    const id = this.activatedRoute.snapshot.params['productId'];

    const product = await this.apiService.getCurrentProduct(id);
   
    const lockedUserId = this.userService.user?.id;
  
    if (!product) {
      console.log("Product not found!");
      return;
    } else {
      const updatedUsersLiked = [...product.usersLiked, lockedUserId];
      console.log(updatedUsersLiked)
      // Актуализираме документа в Firestore с новия масив usersLiked
      const collectionInstance = collection(this.firestore, 'products');
      const washingtonRef = doc(collectionInstance, id);
      await updateDoc(washingtonRef, {
        usersLiked: updatedUsersLiked,
      });
    }

  }
}