import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should be 3", () => {
    const num1 = 1;
    const num2 = 2;
    expect(num1 + num2).toBe(3);
  })

   it('should render title', () => {
     const app = fixture.componentInstance;
     console.log(compiled);
     expect(app.title()).toEqual('Hello, zoneless-calculator');
   });

   it('should render routerOutlet', () => {
    //expect(compiled.querySelector('router-outlet')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
   })
});
