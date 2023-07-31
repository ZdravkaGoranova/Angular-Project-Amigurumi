import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { Comment } from 'src/app/types/comment';
import { UserService } from 'src/app/user/user.service';

import {
  Firestore, getFirestore,
  collection, addDoc, collectionData,
  doc, updateDoc, deleteDoc, getDoc,
  getDocs, query, where
} from '@angular/fire/firestore';
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

  isLoalding: boolean = true;

  // descToShow: string;
  // productDescLen: number;
  // showReadMoreBtn: boolean = true;
  // showHideBtn: boolean = false;
  // imageIsShown: boolean = true;
  // imageButtonTitle: string = 'Show Image';

  likeIsShown: boolean = false;
  likeButtonTitle: string = 'Like';

  isDeleteProduct: boolean = false;

  newComment: string = '';
  commentsProduct: Comment[] = [];

  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
  ) {

    // this.activatedRoute.params.subscribe((v) => console.log(v))

    // this.productDescLen = 0;
    // this.descToShow = "";
    this.getCommentsProducts()
  }
  async ngOnInit(): Promise<void> {
    this.fetchTheme();
    await this.checkIsOwner();
    this.isOwner()
    this.isLoalding=false;
    // console.log(this.isOwner())
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

  toggleLike(): void {
    this.likeIsShown = !this.likeIsShown;
    this.likeButtonTitle = this.likeIsShown ? 'Like' : 'You already liked!';

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

  async addComment(): Promise<void> {
    if (this.newComment.trim() === '') {
      // Проверка за празен коментар
      alert('Please enter a comment.');
      return;
    }
    debugger
    const id = this.activatedRoute.snapshot.params['productId'];

    const collectionInstance = collection(this.firestore, 'products', id, 'comments');
    const newComment = {
      text: this.newComment,
      user: {
        name: this.userService.user?.email,
        userId: this.userService.user?.id,
      },
      timestamp: new Date(),
    };

    try {
      await addDoc(collectionInstance, newComment);
      console.log('Comment added successfully!');
      await this.getCommentsProducts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }

    this.newComment = ''; // Нулиране на полето за коментар след добавяне
  }

  async getCommentsProducts(): Promise<void> {
    debugger;
    const id = this.activatedRoute.snapshot.params['productId'];
  
    const collectionInstance = collection(this.firestore, 'products', id, 'comments');
  
    try {
      const querySnapshot = await getDocs(collectionInstance);
      const comments: any[] = [];
      
      querySnapshot.forEach((doc) => {
        // Извличане на данните от документа
        const data = doc.data();
        comments.push(data);
      });
  
      console.log('Comments:', comments);
      // Запазване на коментарите в променлива за използване в шаблона
      this.commentsProduct = comments;
    } catch (error) {
      console.error('Error getting comments:', error);
    }
  }


    // hideDesc(): void {
  //   this.productDescLen = 0;
  //   this.descToShow = "";
  //   this.showReadMoreBtn = true;
  //   this.showHideBtn = false;
  // }
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
}