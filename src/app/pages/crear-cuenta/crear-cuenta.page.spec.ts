import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCuentaPage } from './crear-cuenta.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CrearCuentaPage', () => {
  let component: CrearCuentaPage;
  let fixture: ComponentFixture<CrearCuentaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCuentaPage],
      providers: [SQLite],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
