import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './types/product';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, getDoc, getDocs } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { Observable, } from 'rxjs';
import { ErrorService } from './core/error/error.service';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
 
  // products: Observable<Product[]>

  productData!: Observable<any>;

  constructor(private http: HttpClient,

    private fireauth: AngularFireAuth,
    private router: Router,
    private firestore: Firestore,
    private errorService: ErrorService,

  ) { }

  async getDataProducts(): Promise<Product[]> {
    try {
      const collectionInstance = collection(this.firestore, 'products');
      const data = await collectionData(collectionInstance).toPromise();

      if (data) {
        const products: Product[] = data.map((docData) => {
          const { id, ownerId, description, imageUrl, skillLevel, title, category, usersLiked, coments, emailOwner } = docData;
          return { id, ownerId, description, imageUrl, skillLevel, title, category, usersLiked, coments, emailOwner };
        });
        return products;
      } else {
        return [];
      }
    } catch (error) {
      this.errorService.setError(error);
      return [];
    }

    //subscribe
    // getDataProducts() {
    //   const collectionInstance = collection(this.firestore, 'products');
    //   collectionData(collectionInstance).subscribe(val => {
    //     console.log(val)
    //   })
    //   this.productData = collectionData(collectionInstance);


    // const db = getFirestore();
    // const colRef = collection(db, 'products');

    // return getDocs(colRef)
    //   .then((snapshot) => {
    //     let products: Product[] = [];
    //     snapshot.docs.forEach((doc) => {
    //       products.push({ ...doc.data(), id: doc.id });
    //     });
    //     return products;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return [];
    //   });
  }

  async deleteProducts(id: string) {

    try {
      const collectionInstance = collection(this.firestore, 'products');

      await deleteDoc(doc(collectionInstance, id));
    } catch (error) {
      this.errorService.setError(error);

    }
  }

  async getCurrentProduct(id: string): Promise<Product | null> {

    try {
      const collectionInstance = collection(this.firestore, 'products');

      const docRef = doc(collectionInstance, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const productData = docSnap.data();

        const product: Product = {
          id: docSnap.id,
          ownerId: productData['ownerId'],
          description: productData['description'],
          imageUrl: productData['imageUrl'],
          skillLevel: productData['skillLevel'],
          title: productData['title'],
          category: productData['category'],
          usersLiked: productData['usersLiked'],
          coments: productData['coments'],
          emailOwner: productData['emailOwner'],

        };
        console.log(product)
        return product;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      this.errorService.setError(error);
      return null;
    }

  }

  async getCurrentProductOwner(id: string): Promise<string | null> {

    try {
      const collectionInstance = collection(this.firestore, 'products');
      const docRef = doc(collectionInstance, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data();

        console.log(productData)
        const ownerId: string = productData['ownerId'];
       
        console.log(ownerId)
        return ownerId;
      } else {
        console.log("No such document!");
        return null;
      }

    } catch (error) {
      this.errorService.setError(error);
      return null;
    }
  }

}


 // async getAll() {
  //   const collectionInstance = collection(this.firestore, 'products');

  //   const querySnapshot = await getDocs(collectionInstance);
  //   querySnapshot.forEach((doc) => {

  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }

    // getProducts() {
  //   const { apiUrl } = environment
  //   return this.http.get<Product[]>(`${apiUrl}.json`)
  // }

  // getSingleProduct(id: string) {
  //   const { apiUrl } = environment
  //   return this.http.get<Product>(`${apiUrl}/${id}/.json`)
  // }