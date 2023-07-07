import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  // { path: '/', component: MainComponent},
  // { path: '', pathMatch:'full', component: MainComponent},

  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'logout', component:},

  { path: 'catalog', component: MainComponent },

  // { path: 'Profile', component:},
  // { path: 'CONTACT', component:}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
