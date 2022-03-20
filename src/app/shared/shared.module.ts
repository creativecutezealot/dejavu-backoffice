import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionTypePipe } from './pipes/transaction-type.pipe';
import { PlaceTypePipe } from './pipes/place-type.pipe';
import { GamesStatusClassPipe } from './pipes/games-status-class.pipe';
import { SharedComponent } from './shared.component';

@NgModule({
    declarations:[
        TransactionTypePipe,
        PlaceTypePipe,
        GamesStatusClassPipe,
        SharedComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        TransactionTypePipe,
        PlaceTypePipe,
        GamesStatusClassPipe 
    ],
})
export class SharedModule{}