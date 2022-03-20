import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AppConfig } from './app.config';
import { CoreModule } from './core/core.module';
import { AdminsService } from './settings/admins/admins.service';
import { ApiConversionService } from './settings/api-conversion/api-conversion.service';
import { CoreService } from './core/core.service';
import { SeasonsService } from './seasons/seasons.service';
import { GamesService } from './games/games.service';
import { TeamsService } from './teams/teams.service';
import { UsersService } from './users/users.service';
import { UsersViewPointsService } from './users/users-view/users-view-points/users-view-points.service';
import { UsersViewGamesPlayedService } from './users/users-view/users-view-game-played/users-view-game-played.service';
import { UsersViewGamePlayedBetsService } from './users/users-view/users-view-game-played-bets/users-view-game-played-bets.service';
import { GamePlaysService } from './games/games-plays/games-plays.service';
import { GameUsersService } from './games/game-users/game-users.service';
import { DashboardService } from './dashboard/dashboard.service';
import { SimulatorsService } from './simulators/simulators.service';
import { AppService } from './app-service';
import { RoleGuardService } from './auth/role-guard.service';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    CoreService,
    AppService,
    AuthService,
    AuthGuard,
    AppConfig,
    AdminsService,
    ApiConversionService,
    SeasonsService,
    GamesService,
    TeamsService,
    UsersService,
    UsersViewPointsService,
    UsersViewGamesPlayedService,
    UsersViewGamePlayedBetsService,
    GamePlaysService,
    GameUsersService,
    DashboardService,
    SimulatorsService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
