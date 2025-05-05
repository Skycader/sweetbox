import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { CurtomRouteReuseStrategy } from './route-reuse.strategy';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [
  //   {
  //     provide: RouteReuseStrategy,
  //     useClass: CurtomRouteReuseStrategy,
  //   },
  // ],
})
export class AppRoutingModule { }
