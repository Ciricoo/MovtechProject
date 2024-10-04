import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAnswersComponent } from './see-answers.component';

describe('SeeAnswersComponent', () => {
  let component: SeeAnswersComponent;
  let fixture: ComponentFixture<SeeAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
