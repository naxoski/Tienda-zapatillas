import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarUsuarioPage } from './modificar-usuario.page';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

describe('ModificarUsuarioPage', () => {
  let component: ModificarUsuarioPage;
  let fixture: ComponentFixture<ModificarUsuarioPage>;
  let sqliteService: SQLite; // Variable para el servicio SQLite

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarUsuarioPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '500' })), // Proporciona un valor para paramMap
          },
        },
        SQLite,
      ],
    }).compileComponents();

    // Obtenemos una referencia al servicio SQLite
    sqliteService = TestBed.inject(SQLite);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

