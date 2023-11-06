import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPage } from './not-found.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NotFoundPage);
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
