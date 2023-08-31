import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuEliminarPage } from './menu-eliminar.page';

describe('MenuEliminarPage', () => {
  let component: MenuEliminarPage;
  let fixture: ComponentFixture<MenuEliminarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuEliminarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
