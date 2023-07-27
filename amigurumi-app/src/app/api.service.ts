import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
// import { Product } from './types/product';
import { Firestore, getFirestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc, getDocs } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface Product {
  id?: string;
  author: string;
  description: string;
  imageUrl: string;
  skillLevel: string;
  title: string;


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


  getProducts() {
    const { apiUrl } = environment
    return this.http.get<Product[]>(`${apiUrl}.json`)
  }

  getSingleProduct(id: string) {
    const { apiUrl } = environment
    return this.http.get<Product>(`${apiUrl}/${id}/.json`)
  }

  async getDataProducts(): Promise<Product[]> {
    debugger;
    const collectionInstance = collection(this.firestore, 'products');
    const data = await collectionData(collectionInstance).toPromise();
    debugger;
    if (data) {
      const products: Product[] = data.map((docData) => {
        const { id, author, description, imageUrl, skillLevel, title } = docData;
        return { id, author, description, imageUrl, skillLevel, title };
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

  async getCurrentProduct(id: string) {
    const collectionInstance = collection(this.firestore, 'products');

    const docRef = doc(collectionInstance, id);
    const docSnap = await getDoc(docRef);
    debugger;
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

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
