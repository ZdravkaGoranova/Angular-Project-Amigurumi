import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
// import { Product } from './types/product';
import { Firestore, getFirestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc, getDocs } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { from, Observable, of } from 'rxjs';


interface Product {
  id?: string;
  owner: string;
  description: string;
  imageUrl: string;
  skillLevel: string;
  title: string;
  category: string;


  // public usersLiked: [],
  // public coments:  [],
}

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
    debugger;
    const collectionInstance = collection(this.firestore, 'products');
    const data = await collectionData(collectionInstance).toPromise();
    debugger;
    if (data) {
      const products: Product[] = data.map((docData) => {
        const { id, owner, description, imageUrl, skillLevel, title,category } = docData;
        return { id, owner, description, imageUrl, skillLevel, title ,category};
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
  debugger
    const docRef = doc(collectionInstance, id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    
  
      // Create a new Product instance and populate it with the data
      const productData = docSnap.data();
      const product: Product = {
        id: docSnap.id,
        owner: productData['owner'],
        description: productData['description'],
        imageUrl: productData['imageUrl'],
        skillLevel: productData['skillLevel'],
        title: productData['title'],
        category: productData['category'],
      };
  console.log(product)
      return product;
    } else {
      console.log("No such document!");
      return null;
    }
  }
  // async getCurrentProduct(id: string) {
  //   const collectionInstance = collection(this.firestore, 'products');

  //   const docRef = doc(collectionInstance, id);
  //   const docSnap = await getDoc(docRef);
  //   debugger;
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     console.log(typeof docSnap.data())
  //     return docSnap.data();
  //   } else {

  //     console.log("No such document!");
  //   }
  // }



  // getCurrentProduct(id: string): Observable<Product> { // Return an Observable of type Product
  //   const collectionInstance = collection(this.firestore, 'products');
  //   const docRef = doc(collectionInstance, id);
  //   return new Observable((observer) => {
  //     getDoc(docRef)
  //       .then((docSnap) => {
  //         if (docSnap.exists()) {
  //           const productData: Product = docSnap.data() as Product;
  //           observer.next(productData);
  //         } else {
  //           observer.next(null);
  //         }
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //         observer.complete();
  //       });
  //   });
  // }
  async getAll() {
    const collectionInstance = collection(this.firestore, 'products');
    debugger;
    const querySnapshot = await getDocs(collectionInstance);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

}
