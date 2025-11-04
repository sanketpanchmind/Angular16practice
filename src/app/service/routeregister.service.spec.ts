import { TestBed } from '@angular/core/testing';

import { RouteregisterService } from './routeregister.service';

describe('RouteregisterService', () => {
  let service: RouteregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
