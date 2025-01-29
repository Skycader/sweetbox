import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionComponent } from './components/mission/mission.component';
import { MissionsListComponent } from './components/missions-list/missions-list.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CompletedPipe } from './utils/pipes/completed.pipe';

@NgModule({
  declarations: [MissionComponent, MissionsListComponent, MainLayoutComponent, CompletedPipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'missions',
        component: MainLayoutComponent,
      },
    ]),
  ],
})
export class MissionsModule { }
