import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IResponse } from './models';

const mockResponses: IResponse[] = [
  { userId: '1', questionId: '100', answeredIndex: 1 },
  { userId: '1', questionId: '200', answeredIndex: 0 },
  { userId: '1', questionId: '300', answeredIndex: 2 },
  { userId: '2', questionId: '100', answeredIndex: 1 },
  { userId: '2', questionId: '200', answeredIndex: 3 },
  { userId: '2', questionId: '300', answeredIndex: 0 },
  { userId: '3', questionId: '100', answeredIndex: 2 },
  { userId: '3', questionId: '200', answeredIndex: 1 },
  { userId: '3', questionId: '300', answeredIndex: 0 },
  { userId: '4', questionId: '100', answeredIndex: 1 },
  { userId: '4', questionId: '200', answeredIndex: 0 },
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.responses = mockResponses;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('calculate results', () => {
    it('should return a list of user ids who answered both questions with the desired answer', () => {
      const res = component.calculateResults('100', 1, '200', 0);
      expect(res.length).toBe(2);
    });

    it('should return an empty array if there are no matches', () => {
      const res = component.calculateResults('100', 0, '200', 1);
      expect(res.length).toBe(0);
    });

    it('should return an empty array for non-existing questions', () => {
      const res = component.calculateResults('500', 1, '200', 0);
      expect(res.length).toBe(0);
    });
  });
});
