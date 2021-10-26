import { TestBed } from '@angular/core/testing';

import { TypeStepGuard } from './type-step.guard';

describe('TypeStepGuard', () => {
  let guard: TypeStepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TypeStepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
