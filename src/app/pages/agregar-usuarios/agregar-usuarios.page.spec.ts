import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuariosPage } from './agregar-usuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarUsuariosPage', () => {
  let component: AgregarUsuariosPage;
  let fixture: ComponentFixture<AgregarUsuariosPage>;
  let sqliteService: SQLite; // Agregamos una variable para el servicio SQLite

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuariosPage],
      providers: [SQLite]
    }).compileComponents();

    // Obtenemos una referencia al servicio SQLite
    sqliteService = TestBed.inject(SQLite);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
