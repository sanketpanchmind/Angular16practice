import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatformfourComponent } from './matformfour.component';

describe('MatformfourComponent', () => {
  let component: MatformfourComponent;
  let fixture: ComponentFixture<MatformfourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatformfourComponent]
    });
    fixture = TestBed.createComponent(MatformfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
