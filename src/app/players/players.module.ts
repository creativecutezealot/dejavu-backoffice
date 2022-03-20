import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';

@NgModule({
    declarations:[
        PlayersComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        PlayersRoutingModule
    ]
})
export class PlayersModule{

}