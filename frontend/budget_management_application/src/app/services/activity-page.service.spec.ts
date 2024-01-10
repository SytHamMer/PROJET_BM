import { TestBed } from '@angular/core/testing';

import { ActivityPageService } from './activity-page.service';

describe('ActivityPageService', () => {
  let service: ActivityPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
