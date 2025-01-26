import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { PackageComponent } from './components/package/package.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ItemsDisplayComponent } from './components/items-display/items-display.component';

@NgModule({
  declarations: [CardComponent, PackageComponent, MainLayoutComponent, ItemsDisplayComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [CardComponent, PackageComponent, MainLayoutComponent],
})
export class SweetboxModule { }
