import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersViewOverviewComponent } from './users-view/users-view-overview/users-view-overview.component';
import { UsersViewPointsComponent } from './users-view/users-view-points/users-view-points.component';
import { SharedModule } from '../shared/shared.module';
import { UsersViewGamePlayedComponent } from './users-view/users-view-game-played/users-view-game-played.component';
import { UsersViewGamePlayedBetsComponent } from './users-view/users-view-game-played-bets/users-view-game-played-bets.component';
import { UsersViewCurrencyComponent } from './users-view/users-view-currency/users-view-currency.component';
import { UsersViewCurrencyBalanceComponent } from './users-view/users-view-currency/users-view-currency-balance/users-view-currency-balance.component';
import { UsersViewCurrencyRecordComponent } from './users-view/users-view-currency/users-view-currency-record/users-view-currency-record.component';


@NgModule({
    declarations:[
        UsersComponent,
        UsersViewComponent,
        UsersViewOverviewComponent,
        UsersViewPointsComponent,
        UsersViewGamePlayedComponent,
        UsersViewGamePlayedBetsComponent,
        UsersViewCurrencyComponent,
        UsersViewCurrencyBalanceComponent,
        UsersViewCurrencyRecordComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        UsersRoutingModule,
        SharedModule,
    ]
})
export class UsersModule{

}