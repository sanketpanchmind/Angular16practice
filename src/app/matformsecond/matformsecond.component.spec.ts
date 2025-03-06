import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatformsecondComponent } from './matformsecond.component';

describe('MatformsecondComponent', () => {
  let component: MatformsecondComponent;
  let fixture: ComponentFixture<MatformsecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatformsecondComponent]
    });
    fixture = TestBed.createComponent(MatformsecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
