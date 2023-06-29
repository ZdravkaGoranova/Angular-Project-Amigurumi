import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductData } from '../data/data';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor() { }
  
  ngOnInit(): void {
    this.products = new ProductData().getData();
  }
}


