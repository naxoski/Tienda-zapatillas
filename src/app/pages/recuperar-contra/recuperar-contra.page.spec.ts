import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraPage } from './recuperar-contra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('RecuperarContraPage', () => {
  let component: RecuperarContraPage;
  let fixture: ComponentFixture<RecuperarContraPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RecuperarContraPage);
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
