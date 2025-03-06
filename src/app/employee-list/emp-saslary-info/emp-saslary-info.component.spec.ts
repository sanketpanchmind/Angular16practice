import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSaslaryInfoComponent } from './emp-saslary-info.component';

describe('EmpSaslaryInfoComponent', () => {
  let component: EmpSaslaryInfoComponent;
  let fixture: ComponentFixture<EmpSaslaryInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpSaslaryInfoComponent]
    });
    fixture = TestBed.createComponent(EmpSaslaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
