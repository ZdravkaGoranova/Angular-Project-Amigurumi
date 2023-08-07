import { Component, OnInit, } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



import {
  Firestore,
  collection,
  doc,
  setDoc,

} from '@angular/fire/firestore';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {

  imageUrl: string | null = null;
  
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
    private apiService: ApiService,
    private userService: UserService
  ) {

  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['productId'];
    this.apiService.getCurrentProduct(id).then((p)=>{
      this.product=p
    })


  }
  async submitHandler(form: NgForm): Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.params['productId'];
      console.log(id)
   
      const collectionInstance = collection(this.firestore, 'products');
      const washingtonRef = doc(collectionInstance, id);

      const lockedUserId = this.userService.user?.id;
      // const docRef =  doc(collectionInstance, id);
      // await updateDoc(docRef, {

      //   description: form.value.description,
      //   imageUrl: form.value.imageUrl,
      //   skillLevel: form.value.skillLevel,
      //   title: form.value.title,
      //   category: form.value.category,

      // });
      this.imageUrl=form.value.imageUrl;

      await setDoc(doc(collectionInstance, id), {
        description: form.value.description,
        imageUrl: form.value.imageUrl,
        skillLevel: form.value.skillLevel,
        title: form.value.title,
        category: form.value.category,
        ownerId:lockedUserId,
        id: id,
      });


      console.log("Document written with ID: ", washingtonRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    this.router.navigate(['/catalog/products']);

  }
}
