import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product/card-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NewProductComponent,
    DetailsProductComponent,
    CardProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule
    // RouterModule.forChild([
    //   {
    //     path: 'catalog',
    //     component: MainComponent,
    //   },
    //   {
    //     path: 'product/details/:id',
    //     resolve: { product: ProductlResolver },
    //     component: DetailsProductComponent,
    //   },
    // ])

  ], exports: [
    DetailsProductComponent,
    CardProductComponent
  ]
})
export class ProductModule { }
