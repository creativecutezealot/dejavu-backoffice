import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        CoreComponent
        
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        CoreRoutingModule,
    ]
})
export class CoreModule{

}