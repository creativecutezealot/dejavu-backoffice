import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../auth/role-guard.service';
import { PlayersComponent } from './players.component';

const routes: Routes = [
    {
        path: '', component: PlayersComponent,
        // data: {
        //     expectedRole: '1'
        // }
    },
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PlayersRoutingModule {

}