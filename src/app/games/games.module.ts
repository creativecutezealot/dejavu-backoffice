import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamePlaysComponent } from './games-plays/games-plays.component';
import { GameViewComponent } from './game-view/game-view.component';
import { SharedModule } from '../shared/shared.module';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { GameUsersComponent } from './game-users/game-users.component';


@NgModule({
    declarations:[
        GamesComponent,
        GamePlaysComponent,
        GameViewComponent,
        GameOverviewComponent,
        GameUsersComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        SharedModule,
        GamesRoutingModule
    ]
})
export class GamesModule{

}