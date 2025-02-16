import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchivementsListComponent } from './achivements-list.component';

describe('AchivementsListComponent', () => {
  let component: AchivementsListComponent;
  let fixture: ComponentFixture<AchivementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AchivementsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchivementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
