import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { PackageComponent } from './components/package/package.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';



@NgModule({
  declarations: [
    CardComponent,
    PackageComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SweetboxModule { }
