import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFilterComponent } from './bank-filter.component';

describe('BankFilterComponent', () => {
  let component: BankFilterComponent;
  let fixture: ComponentFixture<BankFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankFilterComponent]
    });
    fixture = TestBed.createComponent(BankFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
