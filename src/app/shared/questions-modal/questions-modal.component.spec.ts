import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsModalComponent } from './questions-modal.component';

describe('QuestionsComponent', () => {
  let component: QuestionsModalComponent;
  let fixture: ComponentFixture<QuestionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
