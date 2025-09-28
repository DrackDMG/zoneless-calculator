import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should apply w1/4 doubleSize is false', () => {
    const hostClass: string[] = compiled.classList.value.split(' ');
    expect(hostClass).toContain('w-1/4');
    expect(component.doubleSize()).toBe(false);
  });

  it('should apply w2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('doubleSize', 'true');
    fixture.detectChanges();
    const hostClass: string[] = compiled.classList.value.split(' ');
    expect(hostClass).toContain('w-2/4');
    expect(component.doubleSize()).toBe(true);
  });

});
