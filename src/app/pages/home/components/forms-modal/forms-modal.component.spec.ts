import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModalComponent } from './forms-modalcomponent';

describe('FormsComponent', () => {
  let component: FormsModalComponent;
  let fixture: ComponentFixture<FormsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
