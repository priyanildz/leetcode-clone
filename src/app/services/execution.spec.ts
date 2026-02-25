import { TestBed } from '@angular/core/testing';

import { Execution } from './execution';

describe('Execution', () => {
  let service: Execution;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Execution);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
