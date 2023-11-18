import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCompraPage } from './historial-compra.page';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DbservicesService } from 'src/app/services/dbservices.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('HistorialCompraPage', () => {
  let fixture: ComponentFixture<HistorialCompraPage>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '500', // Simula un parámetro de id con valor '500'
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [HistorialCompraPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute,
        },
        DbservicesService,
        SQLite,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialCompraPage);
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});


