import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// import { AuthActivate } from '../core/guards/auth.activate';
const routes: Routes = [
    {
        path: 'login',
        // canActivate: [AuthActivate],
        component: LoginComponent
    }, {
        path: 'register',
        // canActivate: [AuthActivate],
        component: RegisterComponent
    }, {
        path: 'profile',
        // canActivate: [AuthActivate],
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
