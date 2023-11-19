import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModificarUsuarioPage } from './modificar-usuario.page';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

describe('ModificarUsuarioPage', () => {
  let component: ModificarUsuarioPage;
  let fixture: ComponentFixture<ModificarUsuarioPage>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarUsuarioPage],
      providers: [
        SQLite,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(convertToParamMap({ id: '500' })),
            snapshot: {
              paramMap: convertToParamMap({ id: '500' }),
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuarioPage);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



