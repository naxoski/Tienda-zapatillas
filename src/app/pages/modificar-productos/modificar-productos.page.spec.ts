import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProductosPage } from './modificar-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarProductosPage', () => {
  let component: ModificarProductosPage;
  let fixture: ComponentFixture<ModificarProductosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ModificarProductosPage);
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
