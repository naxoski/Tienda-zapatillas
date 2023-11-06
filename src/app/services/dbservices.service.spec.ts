import { TestBed } from '@angular/core/testing';

import { DbservicesService } from './dbservices.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DbservicesService', () => {
  let service: DbservicesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbservicesService);

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
