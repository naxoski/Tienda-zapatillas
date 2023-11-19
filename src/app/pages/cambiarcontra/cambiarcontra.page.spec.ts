import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarcontraPage } from './cambiarcontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CambiarcontraPage', () => {
  let component: CambiarcontraPage;
  let fixture: ComponentFixture<CambiarcontraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarcontraPage],
      providers: [SQLite], // Agrega el proveedor SQLite aquí
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
