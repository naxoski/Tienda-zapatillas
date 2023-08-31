import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuEditarPage } from './menu-editar.page';

describe('MenuEditarPage', () => {
  let component: MenuEditarPage;
  let fixture: ComponentFixture<MenuEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
