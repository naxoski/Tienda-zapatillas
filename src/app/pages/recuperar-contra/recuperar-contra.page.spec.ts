import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraPage } from './recuperar-contra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RecuperarContraPage', () => {
  let component: RecuperarContraPage;
  let fixture: ComponentFixture<RecuperarContraPage>;

  beforeEach(async () => {
    // Configura el módulo antes de crear el componente
    await TestBed.configureTestingModule({
      declarations: [RecuperarContraPage],
      providers: [SQLite],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});