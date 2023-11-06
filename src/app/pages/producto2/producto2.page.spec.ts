import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Producto2Page } from './producto2.page';

describe('Producto2Page', () => {
  let component: Producto2Page;
  let fixture: ComponentFixture<Producto2Page>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(Producto2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
