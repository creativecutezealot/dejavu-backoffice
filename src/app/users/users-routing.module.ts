import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { RoleGuardService } from '../auth/role-guard.service';

const routes: Routes = [
    {
        path: '', 
        component: UsersComponent, 
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '1'
        }
    },
    { 
        path: 'view/:id', 
        component: UsersViewComponent,
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
export class UsersRoutingModule { }