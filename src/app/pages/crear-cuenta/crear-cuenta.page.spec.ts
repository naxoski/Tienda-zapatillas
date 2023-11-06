import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCuentaPage } from './crear-cuenta.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CrearCuentaPage', () => {
  let component: CrearCuentaPage;
  let fixture: ComponentFixture<CrearCuentaPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(CrearCuentaPage);
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
