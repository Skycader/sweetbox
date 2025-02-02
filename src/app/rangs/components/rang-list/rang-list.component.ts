import { Component, ElementRef, ViewChild } from '@angular/core';
import { RangService } from '../../services/rang.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-rang-list',
  templateUrl: './rang-list.component.html',
  styleUrl: './rang-list.component.scss',
})
export class RangListComponent {
  @ViewChild('rangList') rangList: any;
  public rangs = this.rang.getRangs().slice(0, 31);
  constructor(
    private rang: RangService,
    private modalRef: DialogRef,
  ) { }

  ngOnInit() {
    const audio = new Audio('assets/audio/takeout.mp3');
    audio.volume = 0.3;
    audio.play();
  }

  ngAfterViewInit() {
    document
      .querySelector('#level' + (this.rang.getRang().rang * 1 + 4))
      ?.scrollIntoView();
  }

  currentXp() {
    return this.rang.getXp();
  }

  public getWidth() {
    const req =
      ((this.rang.getXp() - this.rang.getRang().xp) /
        (this.rang.getNextRangXp() - this.rang.getRang().xp)) *
      200;

    return (
      this.rang.getRang().rang * 200 + (this.rang.getRang().rang - 1) * 10 + req
    );
  }

  public achived(i: number) {
    return this.rang.getRang().rang >= i;
  }

  close() {
    this.modalRef.close();
  }

  onWheel(event: any): void {
    this.rangList.nativeElement.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  ngOnDestroy() {
    const audio = new Audio('assets/audio/close.mp3');
    audio.volume = 0.3;
    audio.play();
  }
}
