import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Simulatorsv2Component } from './simulatorsv2.component';

const routes: Routes = [
    {path:'',component: Simulatorsv2Component},
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class Simulatorsv2RoutingModule{}