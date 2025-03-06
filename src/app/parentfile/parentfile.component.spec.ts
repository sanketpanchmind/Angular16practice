import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentfileComponent } from './parentfile.component';

describe('ParentfileComponent', () => {
  let component: ParentfileComponent;
  let fixture: ComponentFixture<ParentfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentfileComponent]
    });
    fixture = TestBed.createComponent(ParentfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
