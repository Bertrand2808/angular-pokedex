import { TestBed } from '@angular/core/testing';

import { TrainerService } from './trainer.service';

describe('TrainerServiceService', () => {
  let service: TrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
