import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimulatorsComponent } from './simulators.component';
import { SimulatorsRoutingModule } from './simulators-routing.module';

@NgModule({
    declarations:[
        SimulatorsComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        SimulatorsRoutingModule
    ]
})
export class SimulatorsModule{

}