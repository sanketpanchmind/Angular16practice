import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbanksComponent } from './addbanks.component';

describe('AddbanksComponent', () => {
  let component: AddbanksComponent;
  let fixture: ComponentFixture<AddbanksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbanksComponent]
    });
    fixture = TestBed.createComponent(AddbanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
