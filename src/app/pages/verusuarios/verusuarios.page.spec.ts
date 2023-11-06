import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerusuariosPage } from './verusuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('VerusuariosPage', () => {
  let component: VerusuariosPage;
  let fixture: ComponentFixture<VerusuariosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(VerusuariosPage);
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
