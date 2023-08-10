import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
// import { AuthActivate } from '../core/guards/auth.activate';


const routes: Routes = [
    {
        path: 'login',
        // canActivate: [AuthGuard],
        component: LoginComponent
    }, {
        path: 'register',
        // canActivate: [AuthGuard],
        component: RegisterComponent
    }, {
        path: 'profile',
        // canActivate: [AuthGuard],
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
