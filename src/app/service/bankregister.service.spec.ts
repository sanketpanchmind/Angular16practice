import { TestBed } from '@angular/core/testing';

import { BankregisterService } from './bankregister.service';

describe('BankregisterService', () => {
  let service: BankregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
