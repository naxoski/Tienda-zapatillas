import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { DbservicesService } from 'src/app/services/dbservices.service';

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await TestBed.configureTestingModule({
      imports: [IonicModule],
      providers: [SQLite, DbservicesService]
    }).compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
