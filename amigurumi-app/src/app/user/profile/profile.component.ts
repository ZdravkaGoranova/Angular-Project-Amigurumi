import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  Firestore, getFirestore,
  collection, addDoc, collectionData,
  doc, updateDoc, deleteDoc, getDoc,
  getDocs, query, where
} from '@angular/fire/firestore';
import { Product } from 'src/app/types/product';

interface Profile {
  fullName: string;
  email: string;
  // gender: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any = {
    gender: 'male' // или 'female'
  };
  isEditMode: boolean = false;

  product: Product[] | null = null;

  profileDetails: Profile = {
    fullName: '',
    email: '',
    // gender: ''
  };

  ownerProducts: Product[] = [];
  likedProducts: Product[] = [];

  isLoalding: boolean = true;
  // profileDetails: Profile = {
  //   fullName: "John",
  //   email: "john.doe@gmail.com",
  //   gender: "male",
  // };
  constructor(
    private userService: UserService,
    private router: Router,
    private firestore: Firestore,
  ) {

    this.getUsersProducts();
    this.getLickedProducts();
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfileHandler(form: NgForm): void {
    console.log(form.value)


    if (form.invalid) {
      return;
    }
    // this.router.navigate(['/']);

    this.profileDetails = { ...form.value } as Profile;
    this.toggleEditMode();
  }

  async getUsersProducts(): Promise<void> {

    const lockedUserId = this.userService.user?.id;

    const collectionInstance = collection(this.firestore, 'products');

    const q = query(collectionInstance, where("ownerId", "==", lockedUserId));
    console.log(q)

    try {
      const querySnapshot = await getDocs(q);
      const productsQ = querySnapshot.docs.map((doc) => doc.data() as Product);
      console.log(productsQ);
      this.ownerProducts.push(...productsQ);
   this.isLoalding=false;
    } catch (e) {
      console.error("Error getting products: ", e);
      this.isLoalding=false;
    }
    console.log(this.ownerProducts)
  }

  async getLickedProducts(): Promise<void> {
    const lockedUserId = this.userService.user?.id;

    const collectionInstance = collection(this.firestore, 'products');

    const q = query(collectionInstance, where("usersLiked", "array-contains", lockedUserId));
    console.log(q)
  
    try {
      const querySnapshot = await getDocs(q);
      const productsQ = querySnapshot.docs.map((doc) => doc.data() as Product);
      console.log(productsQ);
      this.isLoalding=false;
      this.likedProducts.push(...productsQ);
    } catch (e) {
      console.error("Error getting products: ", e);
    }
    console.log(this.likedProducts)
    this.isLoalding=false;
  }

  

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get fullName(): string {
    // return this.userService.user?.email|| '';
    return this.userService.user?.fullName || '';
  }
  get email(): string {
    return this.userService.user?.email || '';
  }

  // get gender(): string {

  //   return this.userService.user?.gender || '';
  // }
  // get isMale(): boolean {
  //   return this.userService.isMale;
  // }
  get isMale(): boolean {
    return this.user.gender === 'male';
  }
}