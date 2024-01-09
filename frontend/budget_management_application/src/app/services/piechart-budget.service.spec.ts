import { TestBed } from '@angular/core/testing';

import { PiechartBudgetService } from './piechart-budget.service';

describe('PiechartBudgetService', () => {
  let service: PiechartBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiechartBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
