import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatformthreeComponent } from './matformthree.component';

describe('MatformthreeComponent', () => {
  let component: MatformthreeComponent;
  let fixture: ComponentFixture<MatformthreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatformthreeComponent]
    });
    fixture = TestBed.createComponent(MatformthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
