import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../common/components/page-not-found/page-not-found.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SweetboxModule } from '../sweetbox/sweetbox.module';
import { MissionsModule } from '../missions/missions.module';
import { StorageModule } from '../storage/storage.module';

@NgModule({
  declarations: [MainLayoutComponent, WelcomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SweetboxModule,
    MissionsModule,
    StorageModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent,
            canActivate: [],
          },
        ],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ]),
  ],
})
export class MainModule { }
