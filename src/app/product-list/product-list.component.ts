import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';

import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ErrorService } from '../core/error/error.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  // productData: Product[]=[];

  isLoalding: boolean = true;
  productData!: Observable<Product[]>;

  @Input() product!: Product;
 

  products: Product[] = [];

  db = getFirestore();
  colRef = collection(this.db, 'products');

  likeButtonTitle: string = 'Like';

  searchKeyword: string = '';
  searcProducts: Product[] = [];
  isSearched: boolean = false;

  constructor(
    private apiService: ApiService,
    private firestore: Firestore,
    private errorService: ErrorService,
    ) {
  
  }
  async ngOnInit(): Promise<void> {

      const collectionInstance = collection(this.firestore, 'products');

      const querySnapshot = await getDocs(collectionInstance);

      querySnapshot.forEach((doc) => {
        this.products.push(doc.data() as Product);
        console.log(doc.id, " => ", doc.data());
      });
      this.isLoalding=false;
      console.log(this.products)
    }
  
    async searchProducts(keyword: string): Promise<void> {
 
      this.searcProducts = [];
      console.log(this.searcProducts);

      const collectionInstance = collection(this.firestore, 'products');
      const lowerCaseKeyword = keyword.toLowerCase();
      const q = query(collectionInstance,
        //  where('title', '>=', lowerCaseKeyword),
        //   where('title', '<=', lowerCaseKeyword + '\uf8ff'),
          where('category', '>=', lowerCaseKeyword),
          where('category', '<=', lowerCaseKeyword + '\uf8ff'));
      try {
        const querySnapshot = await getDocs(q);
        debugger
        this.searcProducts = querySnapshot.docs.map((doc) => doc.data() as Product);
  
        this.isLoalding=false;
        if (this.searcProducts.length > 0) {
          this.isSearched = true;
        } else {
          this.isSearched = true;
        }
        console.log(this.searcProducts.length)
          } catch (e) {
            console.error("Error searching products: ", e);
            this.errorService.setError(e);
            this.isLoalding=false;
          }
      // console.log(this.searcProducts)
    }
  }


    // async getAll() {
    //   const collectionInstance = collection(this.firestore, 'products');
    //   debugger;
    //   const querySnapshot = await getDocs(collectionInstance);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     this.products.push(doc.data())
    //     console.log(doc.id, " => ", doc.data());
    //   });
  
    //   console.log(this.products)
    // }

// try {

//   this.apiService.getAll()
  
//       this.isLoading = false;
//     } catch (error) {
//       console.log(error);
//       this.isLoading = false;
//     }
   
          // this.apiService.getProducts().subscribe((products) => { 
            // this.products=products;
          //   console.log(products)
          //  })
      
          //   const collectionInstance = collection(this.firestore, 'products');
          //   debugger;
          //   collectionData(collectionInstance).subscribe(val => {
          //     console.log('zzzzzzzzzzz')
           
          //     console.log(val)
          //   })
            // this.productData = collectionData(collectionInstance);
         
    // try {
    //   const snapshot = await getDocs(this.colRef);
    //   console.log(snapshot)
    //   snapshot.docs.forEach((doc) => {
    //     const data = doc.data() as Partial<Product>;
    //     if (data.author && data.description && data.imageUrl && data.skillLevel && data.title) {
    //       console.log()
    //       this.products.push({ ...data, id: doc.id } as Product);
    //     }
    //   });
    //   console.log(this.products)
    //   this.isLoading = false;
    // } catch (error) {
    //   console.log(error);
    //   this.isLoading = false;
    // }

    // try {
    //   this.products = await this.apiService.getProducts();
    //   this.isLoading = false;
    // } catch (error) {
    //   console.log(error);
    //   this.isLoading = false;
    // }


    // this.apiService.getProducts().subscribe({
    //   // this.apiService.getProducts().subscribe({


    //   next: (products) => {
    //     console.log({ products })
    //     this.products = products;
    //     debugger;
    //     this.isLoading = false;
    //   }
    //   , error: (err) => {
    //     this.isLoading = false;
    //     console.log(`Error: ${err}`)
    //   },
    // })

  


  // constructor(private apiService: ApiService) { }

  // ngOnInit(): void {

  //   this.apiService.getProducts().subscribe((products) => { console.log(products) })
  // }

