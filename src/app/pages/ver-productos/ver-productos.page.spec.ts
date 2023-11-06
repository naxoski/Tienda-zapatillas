import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerProductosPage } from './ver-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('VerProductosPage', () => {
  let component: VerProductosPage;
  let fixture: ComponentFixture<VerProductosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(VerProductosPage);
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
