import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { RoleGuardService } from '../auth/role-guard.service';
import { DashboardComponent } from './dashboard.component';


const dashboardRoutes: Routes = [
    {path:'',component: DashboardComponent}
]
@NgModule({
    imports:[
        RouterModule.forChild(dashboardRoutes)
    ],
    exports:[RouterModule]
})
export class DashboardRoutingModule{

}