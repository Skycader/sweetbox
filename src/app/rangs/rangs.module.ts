import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangListComponent } from './components/rang-list/rang-list.component';
import { MaterialModule } from '../material/material.module';
import { NewRangComponent } from './components/new-rang/new-rang.component';

@NgModule({
  declarations: [RangListComponent, NewRangComponent],
  imports: [CommonModule, MaterialModule],
})
export class RangsModule { }
