import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Product } from './types/product';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts() {
    const { appUrl } = environment
    return this.http.get<Product[]>(`${appUrl}`)
  }

  getSingleProduct(id: number) {
    const { appUrl } = environment
    return this.http.get<Product>(`${appUrl}/${id}`)
  }

}
