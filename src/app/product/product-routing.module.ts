import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { MainComponent } from '../main/main.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
    {
        path: 'products',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: MainComponent,
            }, {
                path: ':productId',
                component: DetailsProductComponent,
            },{
                path: 'edit/:productId', 
                component: EditProductComponent,
              },
        ],
    }, {
        path: 'addNewProduct',
        component: NewProductComponent
    },
    // }, {
    //     path: 'add-product',
    //     component: NewThemeComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
