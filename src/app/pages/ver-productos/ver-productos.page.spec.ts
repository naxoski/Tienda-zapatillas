import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerProductosPage } from './ver-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('VerProductosPage', () => {
  let component: VerProductosPage;
  let fixture: ComponentFixture<VerProductosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SQLite],
      declarations: [VerProductosPage], // Agrega tu componente a las declaraciones
    }).compileComponents();

    fixture = TestBed.createComponent(VerProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

