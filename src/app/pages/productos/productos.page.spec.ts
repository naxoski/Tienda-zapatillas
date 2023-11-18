import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosPage } from './productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ProductosPage', () => {
  let component: ProductosPage;
  let fixture: ComponentFixture<ProductosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SQLite],
      declarations: [ProductosPage], // Agrega tu componente a las declaraciones
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
