import { TestBed } from '@angular/core/testing';

import { VerordenesserviceService } from './verordenesservice.service';

describe('VerordenesserviceService', () => {
  let service: VerordenesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerordenesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
