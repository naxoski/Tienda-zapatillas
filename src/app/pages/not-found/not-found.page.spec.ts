import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPage } from './not-found.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('NotFoundPage', () => {
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundPage],
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
