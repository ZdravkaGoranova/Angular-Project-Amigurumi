import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { Comment } from 'src/app/types/comment';
import { UserService } from 'src/app/user/user.service';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import * as moment from 'moment';
import {
  Firestore, getFirestore,
  collection, addDoc, collectionData,
  doc, updateDoc, deleteDoc, getDoc,
  getDocs, query, where,
} from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  isLiked: boolean = false;
  likeButtonTitle: string = 'Like';
  likeIsShown: boolean = false;

  isDeleteProduct: boolean = false;

  newComment: string = '';
  commentsProduct: Comment[] = [];


  ownerEmailOrDisplayName: string | null | undefined = null;

  // descToShow: string;
  // productDescLen: number;
  // showReadMoreBtn: boolean = true;
  // showHideBtn: boolean = false;
  // imageIsShown: boolean = true;
  // imageButtonTitle: string = 'Show Image';


  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.checkIsOwner();
    // this.activatedRoute.params.subscribe((v) => console.log(v))

    // this.productDescLen = 0;
    // this.descToShow = "";
    this.getCommentsProducts()
  }
  async ngOnInit(): Promise<void> {
    await this.fetchTheme();
    await this.checkIsOwner();
    this.isOwner()
    this.isLoalding = false;
    console.log(this.ownerEmailOrDisplayName)
    const id = this.activatedRoute.snapshot.params['productId'];
    debugger
    const productData = await this.apiService.getCurrentProduct(id);
    const ownerId = productData?.ownerId; // Ensure productData is of type Product, not a string.
    // if (ownerId) {
    //   const ownerData = await this.getOwnerEmailOrDisplayName(ownerId);
    //   console.log(ownerData);
    //   this.ownerEmailOrDisplayName = ownerData ? ownerData : null;
    //   console.log(this.ownerEmailOrDisplayName);
    // } else {
    //   this.ownerEmailOrDisplayName = null;
    // }

  }

  async checkIsOwner(): Promise<void> {
    const id = this.activatedRoute.snapshot.params['productId'];

    const product = await this.apiService.getCurrentProduct(id);

    const lockedUserId = this.userService.user?.id;
    this.isOwnerStatus = this.userService.isLogged && product?.ownerId === lockedUserId;
    console.log(this.isOwnerStatus);
    // if (product && this.isOwnerStatus) {
    //   this.ownerEmailOrDisplayName = this.userService.user?.fullName;
    //   console.log(this.ownerEmailOrDisplayName);
    // } else if (product) {
    //   const ownerId = product?.ownerId;
    //   debugger
    //   const ownerData = await this.getOwnerEmailOrDisplayName(ownerId);
    //   console.log(ownerData);
    //   this.ownerEmailOrDisplayName = ownerData ? ownerData : null;
    //   console.log(this.ownerEmailOrDisplayName);
    // } else {
    //   this.ownerEmailOrDisplayName = null;
    // }
  }

  // async getOwnerEmailOrDisplayName(ownerId: string): Promise<any> {
  //   try {
  //     const userRef = doc(this.firestore, 'users', ownerId);
  //     const userDoc = await getDoc(userRef);

  //     if (userDoc.exists()) {
  //       const displayName = userDoc.data()['displayName'];
  //       const email = userDoc.data()['email'];
  //       const uid = userDoc.data()['uid'];

  //       console.log(displayName);
  //       console.log(email);
  //       console.log(uid);

  //       return displayName;



  //     } else {
  //       console.log('User not found!');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error getting user by ID:', error);
  //     return null;
  //   }
 
  // }


  //   onAuthStateChanged(auth, (user) => {
  //     if (user !== null) {
  //       const displayName = user.displayName;
  //       const email = user.email;
  //       const uid = user.uid;

  //       console.log(displayName);
  //       console.log(email);
  //       console.log(uid);
  //       resolve(displayName);
  //     } else {
  //       console.log("No such document!");
  //       resolve(null);
  //     }
  //   }, (error) => {
  //     console.error('Error getting user:', error);
  //     reject(error);
  //   });
  //   });
  // }

  // async getOwnerEmailOrDisplayName(ownerId: string | null | undefined): Promise<string | null | undefined> {
  //   if (!ownerId) {
  //     return null;
  //   }

  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user !== null) {
  //       debugger
  //       const displayName = user.displayName;
  //       const email = user.email;
  //       const uid = user.uid;

  //       console.log(displayName);
  //       console.log(email);
  //       console.log(uid);
  //       return displayName;
  //     } else {
  //       console.log("No such document!");
  //       return null;
  //     }
  //   });
  // }

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
      // Актуализираме документа в Firestore с новия масив usersLiked
      const collectionInstance = collection(this.firestore, 'products');
      const washingtonRef = doc(collectionInstance, id);
      await updateDoc(washingtonRef, {
        usersLiked: updatedUsersLiked,
      });
      this.isLiked = true;
    }

  }

  async addComment(): Promise<void> {
    if (this.newComment.trim() === '') {
   
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

    this.newComment = ''; 
  }

  async getCommentsProducts(): Promise<void> {
    debugger;
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