import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerusuariosPage } from './verusuarios.page';

describe('VerusuariosPage', () => {
  let component: VerusuariosPage;
  let fixture: ComponentFixture<VerusuariosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
