import { TestBed } from '@angular/core/testing';

import { SilverlifeService } from './silverlife.service';

describe('SilverlifeService', () => {
  let service: SilverlifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilverlifeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
