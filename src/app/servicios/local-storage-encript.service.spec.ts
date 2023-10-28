import { TestBed } from '@angular/core/testing';

import { LocalStorageEncriptService } from './local-storage-encript.service';

describe('LocalStorageEncriptService', () => {
  let service: LocalStorageEncriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageEncriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
