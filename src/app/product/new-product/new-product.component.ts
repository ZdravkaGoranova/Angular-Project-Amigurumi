import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  getDocs,
  doc,
  updateDoc,

} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/user/user.service';
import { ErrorService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  productData!: Observable<any>;
  imageUrl: string | null = null;
  user: any = {
    skillLevel: 'easy',
    category: 'baby'
  };

  constructor(
    private firestore: Firestore,
    private router: Router,
    private userService: UserService,
    private errorService: ErrorService,
  ) { }

  async submitHandler(form: NgForm): Promise<void> {
    // console.log(form.value);
    if (form.invalid) {
      return;
    }
    try {
      const collectionInstance = collection(this.firestore, 'products');
      const docRef = await addDoc(collectionInstance, form.value);

      const newProductId = docRef.id;
      console.log(newProductId);

      const lockedUserId = this.userService.user?.id;
      const emailOwner = this.userService.user?.email;

      const washingtonRef = doc(collectionInstance, newProductId);
      // console.log(washingtonRef);

      await updateDoc(washingtonRef, {
        ...form.value,
        id: newProductId,
        ownerId: lockedUserId,
        usersLiked: [],
        coments: [],
        emailOwner: emailOwner,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      this.errorService.setError(e);
    }

    // Reset the form after submission (optional)
    form.reset();
    this.router.navigate(['/catalog/products']);
  }
}
 // form.setValue({ fullName: '', email: '', password: '', gender: '', })
    // const value: { title: string; description: string; skillLevel: string; category: string; } = form.value
    // console.log({ value })
    // console.log(value.description)