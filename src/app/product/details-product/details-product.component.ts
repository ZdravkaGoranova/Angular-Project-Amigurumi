import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { Comment } from 'src/app/types/comment';
import { UserService } from 'src/app/user/user.service';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';

import {
  Firestore,
  collection, addDoc,
  doc, updateDoc,
  getDocs,
} from '@angular/fire/firestore';


import { ErrorService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  product: Product | null = null;

  isOwnerStatus: boolean = false;

  isLoalding: boolean = true;

  isLiked: boolean = false;
  countLikes: number | undefined = 0;
  likeButtonTitle: string = 'Like';
  likeIsShown: boolean = false;

  isDeleteProduct: boolean = false;

  newComment: string = '';
  commentsProduct: Comment[] = [];


  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService,
  ) {

    // this.activatedRoute.params.subscribe((v) => console.log(v))

  }
  async ngOnInit(): Promise<void> {
    await this.fetchTheme();
    await this.checkIsOwner();
    await this.isProductLiked();
    await this.getCommentsProducts();

    this.isOwner()
    this.isLoalding = false;

    const id = this.activatedRoute.snapshot.params['productId'];
    const productData = await this.apiService.getCurrentProduct(id);
    
    this.countLikes = productData?.usersLiked.length || 0;
    console.log(this.countLikes)

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

    console.log(this.isOwnerStatus);

    return this.userService.isLogged && productOwner == lockedUserId;
  }

  async fetchTheme(): Promise<void> {

    const id = this.activatedRoute.snapshot.params['productId'];
    try {
      this.product = await this.apiService.getCurrentProduct(id);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  }

  toggleLike(): void {

    if (!this.isLiked) {

      this.isLiked = true; // Disable the button
      this.likeButtonTitle = this.likeIsShown ? 'Like' : 'You already liked!';
    }
  }

  deleteProduct(): void {
    const id = this.activatedRoute.snapshot.params['productId'];

    this.apiService.deleteProducts(id)

    this.router.navigate(['/auth/profile']);
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

      const collectionInstance = collection(this.firestore, 'products');
      const washingtonRef = doc(collectionInstance, id);
      await updateDoc(washingtonRef, {
        usersLiked: updatedUsersLiked,
      });
      this.isLiked = true;
      const productData = await this.apiService.getCurrentProduct(id);
      this.countLikes = productData?.usersLiked.length;
      console.log(this.countLikes)
    }

  }


  async isProductLiked(): Promise<void> {
    const lockedUserId = this.userService.user?.id;

    const id = this.activatedRoute.snapshot.params['productId'];

    const productData = await this.apiService.getCurrentProduct(id);
    console.log(productData?.usersLiked)

    if (lockedUserId && productData?.usersLiked) {
      this.isLiked = (productData.usersLiked as string[]).includes(lockedUserId);
      console.log(this.isLiked);
      this.likeIsShown = this.isLiked;
    }

  }

  async addComment(): Promise<void> {
    if (this.newComment.trim() === '') {

      alert('Please enter a comment.');
      return;
    }

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
      this.errorService.setError(error);
    }

    this.newComment = '';
  }

  async getCommentsProducts(): Promise<void> {

    const id = this.activatedRoute.snapshot.params['productId'];

    const collectionInstance = collection(this.firestore, 'products', id, 'comments');

    try {
      const querySnapshot = await getDocs(collectionInstance);
      const comments: any[] = [];

      querySnapshot.forEach((doc) => {

        const data = doc.data();
        comments.push(data);
      });

      console.log('Comments:', comments);

      this.commentsProduct = comments;
    } catch (error) {
      console.error('Error getting comments:', error);
    }
  }

}

