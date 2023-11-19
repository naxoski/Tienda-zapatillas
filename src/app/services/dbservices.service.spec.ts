import { TestBed } from '@angular/core/testing';
import { DbservicesService } from './dbservices.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
class SQLiteMock {
  executeSql(query: string) {
    // Implementa un comportamiento simulado para executeSql
    return 'Resultado simulado de la consulta';
  }
}

describe('DbservicesService', () => {
  let service: DbservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DbservicesService,
        { provide: SQLite, useClass: SQLiteMock } // Provee tu mock de SQLite
      ]
    });
    service = TestBed.inject(DbservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });}
  
);
