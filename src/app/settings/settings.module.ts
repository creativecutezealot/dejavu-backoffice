import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsRoutingModule } from './settings-routing.module';
import { AdminsComponent } from './admins/admins.component';
import { ApiConversionComponent } from './api-conversion/api-conversion.component';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';


@NgModule({
    declarations:[
        SettingsComponent,
        AdminsComponent,
        ApiConversionComponent,
        CurrencyTypeComponent
        
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        SettingsRoutingModule
    ]
})
export class SettingsModule{

}