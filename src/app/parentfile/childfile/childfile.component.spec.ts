import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildfileComponent } from './childfile.component';

describe('ChildfileComponent', () => {
  let component: ChildfileComponent;
  let fixture: ComponentFixture<ChildfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildfileComponent]
    });
    fixture = TestBed.createComponent(ChildfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
