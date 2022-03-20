import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes, PreloadAllModules } from '@angular/router';
import { CoreComponent } from './core.component';
import { AuthGuard } from '../auth/auth-guard.service';

const coreRoutes: Routes = [
    {path:'admin',component: CoreComponent,canActivate:[AuthGuard],
    children: [
        {path: 'dashboard',loadChildren:()=>import('../dashboard/dashboard.module').then(m=>m.DashboardModule)},
        {path: 'seasons',loadChildren:()=>import('../seasons/seasons.module').then(m=>m.SeasonsModule)},
        {path: 'games',loadChildren:()=>import('../games/games.module').then(m=>m.GamesModule)},
        {path: 'teams',loadChildren:()=>import('../teams/teams.module').then(m=>m.TeamsModule)},
        {path: 'players',loadChildren:()=>import('../players/players.module').then(m=>m.PlayersModule)},
        {path: 'settings',loadChildren:()=>import('../settings/settings.module').then(m=>m.SettingsModule)},
        {path: 'users',loadChildren:()=>import('../users/users.module').then(m=>m.UsersModule)},
        {path: 'simulators',loadChildren:()=>import('../simulators/simulators.module').then(m=>m.SimulatorsModule)},
        {path: 'simulatorsv2',loadChildren:()=>import('../simulatorsv2/simulatorsv2.module').then(m=>m.Simulatorsv2Module)},
        {path: 'play', loadChildren:()=>import('../play-entries/play-entries.module').then(m=>m.PlayEntriesModule)}
       ]    
},
    
]
@NgModule({
    imports:[
        RouterModule.forRoot(coreRoutes)
    ],
    exports:[RouterModule]
})
export class CoreRoutingModule{

}