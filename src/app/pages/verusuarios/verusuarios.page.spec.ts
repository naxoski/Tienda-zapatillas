import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerusuariosPage } from './verusuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('VerusuariosPage', () => {
  let component: VerusuariosPage;
  let fixture: ComponentFixture<VerusuariosPage>;
  let sqliteService: SQLite; // Variable para el servicio SQLite

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerusuariosPage],
      providers: [SQLite]
    }).compileComponents();

    // Obtenemos una referencia al servicio SQLite
    sqliteService = TestBed.inject(SQLite);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
