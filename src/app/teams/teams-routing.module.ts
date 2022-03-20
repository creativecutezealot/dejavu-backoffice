import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../auth/role-guard.service';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
    {
        path: '', component: TeamsComponent,
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
export class TeamsRoutingModule {

}