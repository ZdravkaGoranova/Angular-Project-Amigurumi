import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product/new-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { CardProductComponent } from './card-product/card-product.component';
import { RouterModule } from '@angular/router';
import { ProductlResolver } from './product-detail.resolver';
@NgModule({
  declarations: [
    NewProductComponent,
    DetailsProductComponent,
    CardProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([

      {
        path: 'product/details/:id',
        resolve: { product: ProductlResolver },
        component: DetailsProductComponent
      },
    ])

  ], exports: [
    DetailsProductComponent,
    CardProductComponent
  ]
})
export class ProductModule { }
