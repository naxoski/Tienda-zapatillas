import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsocamaraPage } from './usocamara.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('UsocamaraPage', () => {
  let component: UsocamaraPage;
  let fixture: ComponentFixture<UsocamaraPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(UsocamaraPage);
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
