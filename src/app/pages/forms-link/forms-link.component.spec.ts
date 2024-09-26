import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsLinkComponent } from './forms-link.component';

describe('FormsLinkComponent', () => {
  let component: FormsLinkComponent;
  let fixture: ComponentFixture<FormsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
