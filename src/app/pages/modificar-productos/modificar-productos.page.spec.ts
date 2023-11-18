import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProductosPage } from './modificar-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarProductosPage', () => {
  let component: ModificarProductosPage;
  let fixture: ComponentFixture<ModificarProductosPage>;
  let sqliteService: SQLite; // Variable para el servicio SQLite

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarProductosPage],
      providers: [SQLite]
    }).compileComponents();

    // Obtenemos una referencia al servicio SQLite
    sqliteService = TestBed.inject(SQLite);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
