import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { MainComponent } from '../main/main.component';

const routes: Routes = [
    {
        path: 'catalog',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: MainComponent,
            }, {
                path: ':productId',
                component: DetailsProductComponent,
            }
        ],
    }
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
