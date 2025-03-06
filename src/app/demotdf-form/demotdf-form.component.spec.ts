import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemotdfFormComponent } from './demotdf-form.component';

describe('DemotdfFormComponent', () => {
  let component: DemotdfFormComponent;
  let fixture: ComponentFixture<DemotdfFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemotdfFormComponent]
    });
    fixture = TestBed.createComponent(DemotdfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
