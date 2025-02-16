import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchivementComponent } from './components/achivement/achivement.component';
import { AchivementsListComponent } from './components/achivements-list/achivements-list.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AchivementComponent,
    AchivementsListComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'achivements',
        component: MainLayoutComponent,
      },
    ]),
  ],
})
export class AchivementsModule { }
