import { Component, OnInit,  } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



import {
  Firestore,
  collection,
  doc,
  setDoc,

} from '@angular/fire/firestore';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent {
  // [x: string]: any;

  product: any = {
    skillLevel: 'easy',
    category: 'baby'
  };
  user: { skillLevel: string; category: string } = {
    skillLevel: 'easy',
    category: 'baby'
  };

  constructor(
    private firestore: Firestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {

  }

  async submitHandler(form: NgForm) : Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.params['productId'];
      console.log(id)
      debugger
      const collectionInstance = collection(this.firestore, 'products');
      const washingtonRef = doc(collectionInstance, id);


      // const docRef =  doc(collectionInstance, id);
      // await updateDoc(docRef, {

      //   description: form.value.description,
      //   imageUrl: form.value.imageUrl,
      //   skillLevel: form.value.skillLevel,
      //   title: form.value.title,
      //   category: form.value.category,

      // });

      await setDoc(doc(collectionInstance, id), {
        description: form.value.description,
        imageUrl: form.value.imageUrl,
        skillLevel: form.value.skillLevel,
        title: form.value.title,
        category: form.value.category,

      });


      console.log("Document written with ID: ", washingtonRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }


    this.router.navigate(['/products']);


  }
}
