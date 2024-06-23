import { TestBed } from '@angular/core/testing';

import { FlowIntegrationService } from './flow-integration.service';

describe('FlowIntegrationService', () => {
  let service: FlowIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
