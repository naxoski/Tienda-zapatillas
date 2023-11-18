import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAdminPage } from './menu-admin.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('MenuAdminPage', () => {
  let component: MenuAdminPage;
  let fixture: ComponentFixture<MenuAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAdminPage],
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
