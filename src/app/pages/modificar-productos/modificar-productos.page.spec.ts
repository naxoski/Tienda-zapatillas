import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProductosPage } from './modificar-productos.page';

describe('ModificarProductosPage', () => {
  let component: ModificarProductosPage;
  let fixture: ComponentFixture<ModificarProductosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ModificarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
