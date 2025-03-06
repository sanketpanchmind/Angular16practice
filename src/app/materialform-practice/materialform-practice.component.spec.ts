import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialformPracticeComponent } from './materialform-practice.component';

describe('MaterialformPracticeComponent', () => {
  let component: MaterialformPracticeComponent;
  let fixture: ComponentFixture<MaterialformPracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialformPracticeComponent]
    });
    fixture = TestBed.createComponent(MaterialformPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
