import { TestBed } from '@angular/core/testing';

import { PrediccionServicioService } from './prediccion-servicio.service';

describe('PrediccionServicioService', () => {
  let service: PrediccionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrediccionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
