import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {
  Firestore,
  collection,
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
    // gender: 'male',
  };

  isEditMode: boolean = false;

  product: Product[] | null = null;

  profileDetails: Profile = {
    fullName: '',
    email: '',
    // gender: ''
  };
  // t = this.userService.user$.forEach((u)=>u?.fullName);

  ownerProducts: Product[] = [];
  likedProducts: Product[] = [];

  isLoalding: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private firestore: Firestore,
  ) {

    const lockedUseremail = this.userService.user?.email;
    const lockedUserfullName = this.userService.user?.fullName;

    this.user = {
      email: lockedUseremail,
      fullName: lockedUserfullName,
    }
    // console.log(this.t)
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
    
    const { fullName } = form.value;
    this.userService.updateUser(fullName);

    // this.profileDetails = { ...form.value } as Profile;
    this.toggleEditMode();
    this.router.navigate(['/auth/profile']);
  }

  async getUsersProducts(): Promise<void> {
    const lockedUserId = this.userService.user?.id;

    const collectionInstance = collection(this.firestore, 'products');

    const q = query(collectionInstance, where("ownerId", "==", lockedUserId));
    console.log(q)

    try {
      const querySnapshot = await getDocs(q);
      const productsQ = querySnapshot.docs.map((doc) => doc.data() as Product);

      this.ownerProducts.push(...productsQ);
      this.isLoalding = false;
    } catch (e) {
      console.error("Error getting users products: ", e);
      this.isLoalding = false;
    }
    console.log(this.ownerProducts)
  }

  async getLickedProducts(): Promise<void> {
    this.likedProducts = [];
    const lockedUserId = this.userService.user?.id;

    const collectionInstance = collection(this.firestore, 'products');

    const q = query(collectionInstance, where("usersLiked", "array-contains", lockedUserId));

    try {
      const querySnapshot = await getDocs(q);
      const productsQ = querySnapshot.docs.map((doc) => doc.data() as Product);

      this.isLoalding = false;

      this.likedProducts.push(...productsQ);
    } catch (e) {
      console.error("Error getting liked products: ", e);
    }
    console.log(this.likedProducts)
    this.isLoalding = false;
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

  get isMale(): boolean {
    return this.user.gender === 'male';
  }

}



  // get gender(): string {

  //   return this.userService.user?.gender || '';
  // }
  // get isMale(): boolean {
  //   return this.userService.isMale;
  // }