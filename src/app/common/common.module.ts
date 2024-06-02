import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NavbarComponent, SideNavComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule, HttpClientModule],
  exports: [NavbarComponent, SideNavComponent, FooterComponent],
})
export class AppCommonModule {}
