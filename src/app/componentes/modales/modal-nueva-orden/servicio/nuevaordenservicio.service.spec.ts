import { TestBed } from '@angular/core/testing';

import { NuevaordenservicioService } from './nuevaordenservicio.service';

describe('NuevaordenservicioService', () => {
  let service: NuevaordenservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaordenservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
