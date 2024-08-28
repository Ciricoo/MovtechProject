import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsGraphComponent } from './nps-graph.component';

describe('NpsGraphComponent', () => {
  let component: NpsGraphComponent;
  let fixture: ComponentFixture<NpsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpsGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
