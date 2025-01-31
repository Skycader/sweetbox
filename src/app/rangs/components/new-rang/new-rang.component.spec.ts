import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRangComponent } from './new-rang.component';

describe('NewRangComponent', () => {
  let component: NewRangComponent;
  let fixture: ComponentFixture<NewRangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
