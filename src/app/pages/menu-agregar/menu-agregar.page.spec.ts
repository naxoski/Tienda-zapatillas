import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAgregarPage } from './menu-agregar.page';

describe('MenuAgregarPage', () => {
  let component: MenuAgregarPage;
  let fixture: ComponentFixture<MenuAgregarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
