import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isSideNav: boolean = false;
  constructor() {}

  public controlNavbar$ = new Subject();

  public get isSideNav() {
    return this._isSideNav;
  }
  public openSideNav() {
    this._isSideNav = true;
  }
  public closeSideNav() {
    this._isSideNav = false;
  }
  public toggleSideNav(): void {
    this._isSideNav = !this.isSideNav;
  }
}
