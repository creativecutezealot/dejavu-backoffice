import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Simulatorsv2Component } from './simulatorsv2.component';
import { Simulatorsv2RoutingModule } from './simulatorsv2-routing.module';

@NgModule({
    declarations:[
        Simulatorsv2Component
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        Simulatorsv2RoutingModule
    ]
})
export class Simulatorsv2Module{

}