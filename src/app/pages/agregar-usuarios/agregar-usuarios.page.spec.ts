import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuariosPage } from './agregar-usuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarUsuariosPage', () => {
  let component: AgregarUsuariosPage;
  let fixture: ComponentFixture<AgregarUsuariosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AgregarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
