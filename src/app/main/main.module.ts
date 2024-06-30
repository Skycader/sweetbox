import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../common/components/page-not-found/page-not-found.component';
import { IsLoggedInGuard } from '../auth/utils/guards/is-logged-in.guard';

@NgModule({
  declarations: [MainLayoutComponent, WelcomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent,
            canActivate: [IsLoggedInGuard],
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
