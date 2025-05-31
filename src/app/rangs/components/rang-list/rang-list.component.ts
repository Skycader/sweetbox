import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rang-list',
  templateUrl: './rang-list.component.html',
  styleUrl: './rang-list.component.scss',
})
export class RangListComponent {
  @Input() rang: any;
  @Input() optionalLogo: any;
  @Input() optionalSkillXp: number = -1;
  @ViewChild('rangList') rangList: any;
  public rangs = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalRef: DialogRef,
  ) {
    console.log(`data`, data);
    this.rang = data.rang;
  }

  ngOnInit() {
    this.rangs = this.rang.getRangs().slice(0, 31);
    if (this.optionalSkillXp >= 0) this.rang.setXp(this.optionalSkillXp);

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
