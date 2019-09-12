import { TestBed } from '@angular/core/testing';

import { UsergalaryServiceService } from './usergalary-service.service';

describe('UsergalaryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsergalaryServiceService = TestBed.get(UsergalaryServiceService);
    expect(service).toBeTruthy();
  });
});
