import { TestBed } from '@angular/core/testing';

import { ViewCommandService } from './view-command.service';

describe('ViewCommandService', () => {
  let service: ViewCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
