import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../auth/role-guard.service';
import { SeasonsComponent } from './seasons.component';

const routes: Routes = [
    {
        path: '', component: SeasonsComponent, canActivate: [RoleGuardService],
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
export class SeasonsRoutingModule {

}