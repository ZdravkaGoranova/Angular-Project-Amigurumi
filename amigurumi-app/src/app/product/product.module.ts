import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsProductComponent } from './details-product/details-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    NewProductComponent,
    DetailsProductComponent,

    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule
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
    // CardProductComponent
  ]
})
export class ProductModule { }
