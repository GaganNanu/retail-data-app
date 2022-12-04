import { TestBed } from '@angular/core/testing';

import { RetailDataService } from './retail-data.service';

describe('RetailDataService', () => {
  let service: RetailDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
