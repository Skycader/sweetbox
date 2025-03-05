import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MissionsModule } from '../missions/missions.module';
import { RangsModule } from '../rangs/rangs.module';
import { PrettyNumberPipe } from './utils/pipes/pretty-number.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SideNavComponent,
    FooterComponent,
    PageNotFoundComponent,
    PrettyNumberPipe,
  ],
  exports: [NavbarComponent, SideNavComponent, FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MissionsModule,
    RangsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppCommonModule { }
