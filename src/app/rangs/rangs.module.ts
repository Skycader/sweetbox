import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangListComponent } from './components/rang-list/rang-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [RangListComponent],
  imports: [CommonModule, MaterialModule],
})
export class RangsModule { }
