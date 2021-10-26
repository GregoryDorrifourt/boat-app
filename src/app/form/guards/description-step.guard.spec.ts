import { TestBed } from '@angular/core/testing';

import { DescriptionStepGuard } from './description-step.guard';

describe('DescriptionStepGuard', () => {
  let guard: DescriptionStepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DescriptionStepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
