import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../auth/role-guard.service';
import { SimulatorsComponent } from './simulators.component';

const routes: Routes = [
    {
        path: '', 
        component: SimulatorsComponent, 
        canActivate: [RoleGuardService],
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
export class SimulatorsRoutingModule { }