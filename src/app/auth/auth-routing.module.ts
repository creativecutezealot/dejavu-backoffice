import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';


const authRoutes: Routes= [
    {path: 'signin', component: SigninComponent}
]
@NgModule({
    imports:[
        RouterModule.forRoot(authRoutes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule{}