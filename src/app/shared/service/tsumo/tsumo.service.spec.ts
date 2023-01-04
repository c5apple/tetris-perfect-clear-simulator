import { TestBed } from '@angular/core/testing';

import { TsumoService } from './tsumo.service';

describe('TsumoService', () => {
  let service: TsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
