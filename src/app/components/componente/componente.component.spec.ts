import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';


import { ComponenteComponent } from './componente.component';

describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponenteComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '123' }) // Aquí puedes simular los parámetros que necesitas
            }
          }
        }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
