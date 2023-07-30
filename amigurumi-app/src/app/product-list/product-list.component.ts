import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';

import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  getFirestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  // productData: Product[]=[];
  productData!: Observable<Product[]>;
  @Input() product!: Product;
  @Input() productDesc!: string;

  products: Product[] = [];
  isLoading: boolean = true;
  private symbols: number = 250;
  db = getFirestore();

  colRef = collection(this.db, 'products');

  // author
  descToShow: string;
  productDescLen: number;
  showReadMoreBtn: boolean = true;
  showHideBtn: boolean = false;
  imageIsShown: boolean = true;
  imageButtonTitle: string = 'Show Image';

  likeIsShown: boolean = false;
  likeButtonTitle: string = 'Like';

  searchKeyword: string = '';
  searcProducts: Product[] = [];
  // isSearcProducts: boolean =true;

  constructor(private apiService: ApiService,
    private firestore: Firestore,
    ) {
    this.productDescLen = 0;
    this.descToShow = "";
  }
  async ngOnInit(): Promise<void> {
 
      const collectionInstance = collection(this.firestore, 'products');

      const querySnapshot = await getDocs(collectionInstance);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // this.products.push(doc.data)
        this.products.push(doc.data() as Product);
        console.log(doc.id, " => ", doc.data());
      });
  
      console.log(this.products)
    }
  
    
    async searchProducts(keyword: string): Promise<void> {
      debugger
      this.searcProducts = [];
      console.log(this.searcProducts)
      const collectionInstance = collection(this.firestore, 'products');
      const lowerCaseKeyword = keyword.toLowerCase();
      const q = query(collectionInstance,
        //  where('title', '>=', lowerCaseKeyword),
        //   where('title', '<=', lowerCaseKeyword + '\uf8ff'),
          where('category', '>=', lowerCaseKeyword),
          where('category', '<=', lowerCaseKeyword + '\uf8ff'));
      try {
        const querySnapshot = await getDocs(q);
        this.searcProducts = querySnapshot.docs.map((doc) => doc.data() as Product);
    debugger
// if(this.searchProducts.length >0){
// this.isSearcProducts=true;
// }
// else if(this.searchProducts.length <=0){
//   this.isSearcProducts=false;
//   }

        
      } catch (e) {
        console.error("Error searching products: ", e);
      
      }
      console.log(this.searcProducts)
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
    //   debugger;
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

  
  // readMore(): void {
  //   this.productDescLen += this.symbols;
  //   if (this.productDescLen >= this.productDesc.length) {
  //     this.showReadMoreBtn = false;
  //     this.showHideBtn = true;
  //     this.descToShow = this.productDesc;
  //   } else {
  //     this.descToShow = this.productDesc.substr(0, this.productDescLen);

  //   }
  // }

  // toggleImage(): void {
  //   this.imageIsShown = !this.imageIsShown;
  //   this.imageButtonTitle = this.imageIsShown ? 'Hide Image' : 'Show Image';

  // }
  // toggleLike(): void {
  //   this.likeIsShown = !this.likeIsShown;
  //   this.likeButtonTitle = this.likeIsShown ? 'Like' : 'You already liked!';

  // }
  // hideDesc(): void {
  //   this.productDescLen = 0;
  //   this.descToShow = "";
  //   this.showReadMoreBtn = true;
  //   this.showHideBtn = false;
  // }


  // products!: Product[];

  // constructor(private apiService: ApiService) { }

  // ngOnInit(): void {

  //   this.apiService.getProducts().subscribe((products) => { console.log(products) })
  // }

