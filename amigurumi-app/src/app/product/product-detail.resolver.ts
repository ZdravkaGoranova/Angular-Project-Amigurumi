import { Injectable } from "@angular/core";
import { Product } from "../types/product";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { ProductData } from "../data/data";
import { ApiService } from "../api.service";
// @Injectable({
//     providedIn: 'root'
// })
// export class ProductlResolver implements Resolve<Product>{
//     constructor(
        // private productData: ProductData,
    //     private apiService: ApiService) { }

    // resolve(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot)
    //     : Product | Observable<Product> | Promise<Product> {
    //     return this.apiService.getSingleProduct(route.params['id'])
    // }

    // resolve(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ): Product | Observable<Product> | Promise<Product> {
    //     return this.productData.getProductId(route.params['id'])
    // }
// }
