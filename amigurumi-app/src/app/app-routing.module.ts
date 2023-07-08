import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  // { path: '/', component: MainComponent},
  
  // { path: '', pathMatch:'full', component: MainComponent},
  { path: '', pathMatch:'full', redirectTo:'app-main'},

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  
  { path: 'notFound', component: NotFoundComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' },


  { path: 'catalog', component: MainComponent },

  { path: 'profile', component:UserProfileComponent},
  // { path: 'CONTACT', component:}

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
