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

    // Modificar el componente para asignar un array de usuarios a la propiedad 'usuarios'
    component.usuario = [
      {
        idusuario: 500,
        rut: '21.475.570-k',
        nombreusuario: 'ignacio',
        apellidousuario: 'huerta',
        fnacimiento: '2004-01-05',
        telefono: 123456789,
        fotoperfil: 'assets/chad.webp',
        correo: 'ignaciohuerta8a@gmail.com',
        clave: 'claveprueba123',
        respuesta: 'si',
        idpregunta: '¿Tienes pareja?',
        idrol: 'usuario'
      },
      {
        idusuario: 600,
        rut: '21.475.571-k',
        nombreusuario: 'ignacio',
        apellidousuario: 'huerta',
        fnacimiento: '2004-01-05',
        telefono: 123456789,
        fotoperfil: 'assets/chad.webp',
        correo: 'administrador@gmail.com',
        clave: 'claveprueba123',
        respuesta: 'si',
        idpregunta: '¿Tienes pareja?',
        idrol: 'admin'
      },
      // Puedes agregar más usuarios según sea necesario
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

