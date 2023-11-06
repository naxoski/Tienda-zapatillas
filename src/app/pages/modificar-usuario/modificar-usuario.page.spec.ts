import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarUsuarioPage } from './modificar-usuario.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarUsuarioPage', () => {
  let component: ModificarUsuarioPage;
  let fixture: ComponentFixture<ModificarUsuarioPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ModificarUsuarioPage);
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
