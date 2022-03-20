import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AdminsComponent } from './admins/admins.component';
import { ApiConversionComponent } from './api-conversion/api-conversion.component';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { RoleGuardService } from '../auth/role-guard.service';




const routes: Routes = [
    {
        path: '', component: SettingsComponent, 
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '1'
        }
    },
    {
        path: 'admins', component: AdminsComponent, 
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '1'
        }
    },
    {
        path: 'api-conversions', component: ApiConversionComponent, 
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '1'
        }
    },
    {
        path: 'currency-type', component: CurrencyTypeComponent, 
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
export class SettingsRoutingModule {

}