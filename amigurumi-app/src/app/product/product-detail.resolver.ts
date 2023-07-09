import { Injectable } from "@angular/core";
import { Product } from "../types/product";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { ProductData } from "../data/data";
@Injectable({
    providedIn: 'root'
})
export class ProductlResolver implements Resolve<Product>{
    constructor(private productData: ProductData) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Product | Observable<Product> | Promise<Product> {
        return this.productData.getProductId(route.params['id'])
    }
}
