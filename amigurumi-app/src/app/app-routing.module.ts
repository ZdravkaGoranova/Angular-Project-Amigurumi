import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailsProductComponent } from './product/details-product/details-product.component';
import { ProductlResolver } from './product/product-detail.resolver';
import { HomeComponent } from './home/home.component';
const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo:'/home' },
  { path: 'home', component: HomeComponent },

  { path: 'notFound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },

  
  // { path: '/', component: MainComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', pathMatch: 'full', redirectTo: 'app-main' },

  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // { path: 'catalog', component: MainComponent },
  // { path: 'details', component: DetailsProductComponent },
  // {
  //   path: 'product/details/:id',
  //   resolve: { product: ProductlResolver },
  //   component: DetailsProductComponent,
  // },
  // { path: 'profile', component: ProfileComponent },

  // { path: 'CONTACT', component:}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
