import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidacionCorreoPage } from './validacion-correo.page';

describe('ValidacionCorreoPage', () => {
  let component: ValidacionCorreoPage;
  let fixture: ComponentFixture<ValidacionCorreoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidacionCorreoPage],
      // Agrega aquí los imports, providers y otros módulos necesarios para la prueba
      // Por ejemplo:
      // imports: [ OtrosMódulosQuePuedenSerNecesarios ],
      // providers: [ OtrosProvidersQuePuedenSerNecesarios ],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidacionCorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
