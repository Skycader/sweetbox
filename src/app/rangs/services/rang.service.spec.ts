import { TestBed } from '@angular/core/testing';

import { RangService } from './rang.service';

describe('RangService', () => {
  let service: RangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
