import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PlayEntriesRoutingModule } from './play-entries-routing.module';
import { PlayEntryComponent } from './play-entry/play-entry.component';
import { GameSchedulesComponent } from './game-schedules/game-schedules.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { OperatorsComponent } from './operators/operators.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select'; 
import { ɵs } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [PlayEntryComponent, GameSchedulesComponent, OperatorsComponent],
  imports: [
    CommonModule,
    PlayEntriesRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    DragDropModule
  ],
  providers: [
    DatePipe,
    NgSelectConfig,
    ɵs,
    DragDropModule
  ]
})
export class PlayEntriesModule { }
