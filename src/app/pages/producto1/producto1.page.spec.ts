import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Producto1Page } from './producto1.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Producto1Page', () => {
  let component: Producto1Page;
  let fixture: ComponentFixture<Producto1Page>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(Producto1Page);
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
