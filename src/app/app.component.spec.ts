import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);    
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
