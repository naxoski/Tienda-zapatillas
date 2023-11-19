import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalPage } from './principal.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';

describe('PrincipalPage', () => {
  let component: PrincipalPage;
  let fixture: ComponentFixture<PrincipalPage>;
  let sqliteService: SQLite; // Variable para el servicio SQLite

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalPage],
      imports: [HttpClientModule],
      providers: [SQLite]
    }).compileComponents();

    // Obtenemos una referencia al servicio SQLite
    sqliteService = TestBed.inject(SQLite);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
