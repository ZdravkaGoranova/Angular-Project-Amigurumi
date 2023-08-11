import { Component, OnInit, } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Firestore, collection, doc, getDoc, setDoc, } from '@angular/fire/firestore';

import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { ErrorService } from 'src/app/core/error/error.service';

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
    private userService: UserService,
    private errorService: ErrorService,
  ) {

  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['productId'];
    this.apiService.getCurrentProduct(id).then((p) => {
      this.product = p
    })


  }
  async submitHandler(form: NgForm): Promise<void> {
    const id = this.activatedRoute.snapshot.params['productId'];
    try {

      console.log(id)

      const collectionInstance = collection(this.firestore, 'products');
      const washingtonRef = doc(collectionInstance, id);

      const docSnap = await getDoc(washingtonRef);
      const productData = docSnap.data();

      const emailOwner = productData ? productData['emailOwner'] : undefined;
      const lockedUserId = this.userService.user?.id;
      this.imageUrl = form.value.imageUrl;

      await setDoc(doc(collectionInstance, id), {
        description: form.value.description,
        imageUrl: form.value.imageUrl,
        skillLevel: form.value.skillLevel,
        title: form.value.title,
        category: form.value.category,
        ownerId: lockedUserId,
        id: id,
        emailOwner: emailOwner,
      });
      console.log("Document written with ID: ", washingtonRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      this.errorService.setError(error);
    }

    this.router.navigate(['/catalog/products/', id]);

  }
}
