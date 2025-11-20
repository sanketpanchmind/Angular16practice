import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingPracticeOneComponent } from './coding-practice-one.component';

describe('CodingPracticeOneComponent', () => {
  let component: CodingPracticeOneComponent;
  let fixture: ComponentFixture<CodingPracticeOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodingPracticeOneComponent]
    });
    fixture = TestBed.createComponent(CodingPracticeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
