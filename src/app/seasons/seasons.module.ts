import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeasonsComponent } from './seasons.component';
import { SeasonsRoutingModule } from './seasons-routing.module';


@NgModule({
    declarations:[
        SeasonsComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        SeasonsRoutingModule
    ]
})
export class SeasonsModule{

}