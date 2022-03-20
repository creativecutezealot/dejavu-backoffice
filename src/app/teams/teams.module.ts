import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select'; 
import { ɵs } from '@ng-select/ng-select';

@NgModule({
    declarations:[
        TeamsComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        TeamsRoutingModule,
        NgSelectModule,
    ],
    providers: [
    NgSelectConfig,
    ɵs,
    ]
})
export class TeamsModule{

}