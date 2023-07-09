import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';
import { ProductData } from '../data/data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// export class ProductListComponent implements OnInit  {
//   products!: Product[];
//   constructor() {}
  
//   ngOnInit(): void {
//     this.products = new ProductData().getData();
//     console.log(this.products)
//   }
// }
export class ProductListComponent implements OnInit {
products!: Product[];
isLoading: boolean = true;
constructor(private apiService: ApiService) { }
ngOnInit(): void {


  this.apiService.getProducts().subscribe({
    next: (products) => {
      console.log({ products })
      this.products = products;
      this.isLoading = false;
    }
    , error: (err) => {
      this.isLoading = false;
      console.log(`Error: ${err}`)
    },
  })
}
}

  // products!: Product[];

  // constructor(private apiService: ApiService) { }

  // ngOnInit(): void {

  //   this.apiService.getProducts().subscribe((products) => { console.log(products) })
  // }

