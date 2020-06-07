import { TestBed } from '@angular/core/testing';

import { TsumoService } from './tsumo.service';

describe('TsumoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TsumoService = TestBed.get(TsumoService);
    expect(service).toBeTruthy();
  });
});
