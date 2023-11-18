import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductosPage } from './agregar-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarProductosPage', () => {
  let component: AgregarProductosPage;
  let fixture: ComponentFixture<AgregarProductosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SQLite],
      declarations: [AgregarProductosPage], // Agrega tu componente a las declaraciones
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

