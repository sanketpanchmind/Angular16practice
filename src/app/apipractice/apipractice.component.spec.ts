import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApipracticeComponent } from './apipractice.component';

describe('ApipracticeComponent', () => {
  let component: ApipracticeComponent;
  let fixture: ComponentFixture<ApipracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApipracticeComponent]
    });
    fixture = TestBed.createComponent(ApipracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
