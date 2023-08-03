import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailsProductComponent } from './product/details-product/details-product.component';
// import { ProductlResolver } from './product/product-detail.resolver';
import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { ErrorComponent } from './core/error/error.component';
const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },

  { path: 'notFound', component: NotFoundComponent },

  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  { path: 'error', component: ErrorComponent },

  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
