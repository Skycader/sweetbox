import { Component, ElementRef, ViewChild } from '@angular/core';
import { RangService } from '../../services/rang.service';

@Component({
  selector: 'app-rang-list',
  templateUrl: './rang-list.component.html',
  styleUrl: './rang-list.component.scss',
})
export class RangListComponent {
  @ViewChild('rangList') rangList: any;
  public rangs = this.rang.getRangs().slice(0, 31);
  constructor(private rang: RangService) { }

  public getWidth() {
    const req = (this.rang.getRang().xp / this.rang.getNextRangXp()) * 200;
    return (
      this.rang.getRang().rang * 200 +
      (this.rang.getRang().rang - 1) * 10 +
      req +
      'px'
    );
  }

  public achived(i: number) {
    return this.rang.getRang().rang >= i;
  }

  onWheel(event: any): void {
    this.rangList.nativeElement.scrollLeft += event.deltaY;
    event.preventDefault();
  }
}
