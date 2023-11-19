import { TestBed } from '@angular/core/testing';
import { DbservicesService } from './dbservices.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

class SQLiteMock {
  // Añade la función create al mock
  create(config: any): Promise<SQLiteObject> {
    // Implementa un comportamiento simulado para create
    return Promise.resolve({
      executeSql: (query: string) => {
        // Implementa un comportamiento simulado para executeSql
        return Promise.resolve({
          rows: {
            item: () => 'Resultado simulado de la consulta',
          },
        });
      },
      transaction: (callback: (tx: any) => void) => {
        // Puedes implementar lógica simulada para transaction si es necesario
        return Promise.resolve(callback({}));
      },
    } as SQLiteObject);
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
  });
});
