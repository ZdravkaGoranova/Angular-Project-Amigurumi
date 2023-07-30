import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './types/product';
import { Firestore,  collection, addDoc, collectionData, doc,  deleteDoc, getDoc, getDocs } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import {  Observable, } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // productsCollection: collectionData<Product>;

  // products: Observable<Product[]>

  productData!: Observable<any>;

  constructor(private http: HttpClient,

    private fireauth: AngularFireAuth,
    private router: Router,
    private firestore: Firestore,

  ) { }

  addData(form: any) {
    console.log(form.value)

  }


  // getProducts() {
  //   const { apiUrl } = environment
  //   return this.http.get<Product[]>(`${apiUrl}.json`)
  // }

  // getSingleProduct(id: string) {
  //   const { apiUrl } = environment
  //   return this.http.get<Product>(`${apiUrl}/${id}/.json`)
  // }

  async getDataProducts(): Promise<Product[]> {

    const collectionInstance = collection(this.firestore, 'products');
    const data = await collectionData(collectionInstance).toPromise();

    if (data) {
      const products: Product[] = data.map((docData) => {
        const { id, ownerId, description, imageUrl, skillLevel, title, category ,usersLiked,coments} = docData;
        return { id, ownerId, description, imageUrl, skillLevel, title, category ,usersLiked,coments};
      });
      return products;
    } else {
      return [];
    }
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
    const collectionInstance = collection(this.firestore, 'products');

    await deleteDoc(doc(collectionInstance, id));
 
  }
  async getCurrentProduct(id: string): Promise<Product | null> {
    const collectionInstance = collection(this.firestore, 'products');

    const docRef = doc(collectionInstance, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());


      // Create a new Product instance and populate it with the data
      const productData = docSnap.data();

      const product: Product = {
        id: docSnap.id,
        ownerId: productData['owner'],
        description: productData['description'],
        imageUrl: productData['imageUrl'],
        skillLevel: productData['skillLevel'],
        title: productData['title'],
        category: productData['category'],
        usersLiked:productData['usersLiked'],
        coments:productData['coments']
      };
      console.log(product)
      return product;
    } else {
      console.log("No such document!");
      return null;
    }
  }

  async getCurrentProductOwner(id: string): Promise<string | null> {
    const collectionInstance = collection(this.firestore, 'products');
    const docRef = doc(collectionInstance, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const productData = docSnap.data();
      const ownerId: string = productData['ownerId'];
      return ownerId;
    } else {
      console.log("No such document!");
      return null;
    }
  }

  async getAll() {
    const collectionInstance = collection(this.firestore, 'products');

    const querySnapshot = await getDocs(collectionInstance);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

}
