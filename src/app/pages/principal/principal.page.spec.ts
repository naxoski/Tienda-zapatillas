import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalPage } from './principal.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PrincipalPage', () => {
  let component: PrincipalPage;
  let fixture: ComponentFixture<PrincipalPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(PrincipalPage);
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
