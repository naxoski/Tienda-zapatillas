import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductosPage } from './agregar-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarProductosPage', () => {
  let component: AgregarProductosPage;
  let fixture: ComponentFixture<AgregarProductosPage>;

  beforeEach(async() => {
    
    fixture = TestBed.createComponent(AgregarProductosPage);
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
