import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameSchedulesComponent } from './game-schedules/game-schedules.component';
import { OperatorsComponent } from './operators/operators.component';
import { PlayEntryComponent } from './play-entry/play-entry.component';


const routes: Routes = [
  {
    path: 'entry/:id',
    component: PlayEntryComponent,
  },
  {
    path: 'game-schedules',
    component: GameSchedulesComponent
  },
  {
    path: 'operators',
    component: OperatorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayEntriesRoutingModule { }
