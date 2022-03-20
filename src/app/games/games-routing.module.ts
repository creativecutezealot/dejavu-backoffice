import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { GameViewComponent } from './game-view/game-view.component';
import { RoleGuardService } from '../auth/role-guard.service';

const routes: Routes = [
    {
        path: '', component: GamesComponent, canActivate: [RoleGuardService],
        data: {
            expectedRole: '1'
        }
    },
    {
        path: 'view/:id', component: GameViewComponent, canActivate: [RoleGuardService],
        data: {
            expectedRole: '1'
        }
    },
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class GamesRoutingModule { }