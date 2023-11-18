import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCompraPage } from './historial-compra.page';
import { ActivatedRoute } from '@angular/router';

describe('HistorialCompraPage', () => {
  let fixture: ComponentFixture<HistorialCompraPage>;

  beforeEach(async () => {
    const fakeActivatedRoute = {
      params: {
        
        id: '500', // Simula un parámetro de id
      }
    };
    await TestBed.configureTestingModule({
      declarations: [HistorialCompraPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialCompraPage);
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});


