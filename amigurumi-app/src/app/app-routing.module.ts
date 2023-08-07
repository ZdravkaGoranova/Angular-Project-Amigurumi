import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';

import { NotFoundComponent } from './not-found/not-found.component';
// import { ProductlResolver } from './product/product-detail.resolver';
import { HomeComponent } from './home/home.component';

import { ErrorComponent } from './core/error/error.component';
const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },

  { path: 'notFound', component: NotFoundComponent },

  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
     // canActivate: [AuthGuard],
  
  }, {
    path: 'catalog',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
     // canActivate: [AuthGuard],
  },
  { path: 'error', component: ErrorComponent },

  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
