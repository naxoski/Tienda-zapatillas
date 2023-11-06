import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(PerfilPage);
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
