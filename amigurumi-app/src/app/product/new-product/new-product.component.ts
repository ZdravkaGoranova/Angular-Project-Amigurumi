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
    private userService: UserService
  ) {
    this.getDataPro();
    this.readData();
  }

  async submitHandler(form: NgForm): Promise<void> {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    try {
      const collectionInstance = collection(this.firestore, 'products');
      const docRef = await addDoc(collectionInstance, form.value);

      const newProductId = docRef.id;
      console.log(newProductId);
  
      const lockedUserId = this.userService.user?.id;
      // console.log(lockedUserId);
      const updatedProductData = {
        ...form.value,
        id: newProductId, 
      };
      // console.log(updatedProductData);
  
      const washingtonRef = doc(collectionInstance, newProductId);
      // console.log(washingtonRef);

      await updateDoc(washingtonRef, {
  
        id: newProductId,
        ownerId:lockedUserId,
        usersLiked:[],
        coments:[]
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   

    this.router.navigate(['/catalog/products']);

    // Reset the form after submission (optional)
    form.reset();


    // const collectionInstance = collection(this.firestore, 'products');
    // addDoc(collectionInstance, form.value).then(() => {
    //   console.log('Data Saved Successfuly')
    // }).catch((err) => {
    //   console.log(err)
    // })

    // if (form.invalid) {
    //   return;
    // }

    this.router.navigate(['/catalog/products']);
    // form.setValue({
    //   fullName: '', email: '', password: '', gender: '',
    // })

    // const value: { title: string; description: string; skillLevel: string; category: string; } = form.value
    // console.log({ value })
    // console.log(value.description)
    // console.log(value.title)
    // console.log(value.category)
    // console.log(value.skillLevel)
  }
  getDataPro() {
    const collectionInstance = collection(this.firestore, 'products');
    collectionData(collectionInstance).subscribe(val => {
      console.log(val)
    })
    this.productData = collectionData(collectionInstance);
  }
  async readData() {
    console.log(' readData------------');
    const querySnapshot = await getDocs(collection(this.firestore, "products"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
}
