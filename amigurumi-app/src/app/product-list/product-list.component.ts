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
export class ProductListComponent implements OnInit  {
  products!: Product[];
  constructor() {}
  
  ngOnInit(): void {
    this.products = new ProductData().getData();
    console.log(this.products)
  }
}
// export class ProductListComponent implements OnInit {
//   constructor(private apiService: ApiService) { }
//   ngOnInit(): void {
//     this.apiService.getProducts().subscribe((products) => { console.log(products) })
//   }
// }
