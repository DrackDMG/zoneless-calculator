import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class MockCalculatorService {
  public resulText = jasmine.createSpy('resulText').and.returnValue('1000.00');
  public subResulText = jasmine.createSpy('subResulText').and.returnValue('5000.00');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');
  public constructorNumber = jasmine.createSpy('constructorNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CalculatorService, useClass: MockCalculatorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // ✅ Aquí ya puedes inyectar el servicio
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    //fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('1000.00');
    expect(component.subResultText()).toBe('5000.00');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculator values', () => {
    mockCalculatorService.resulText = jasmine.createSpy('resulText').and.returnValue('10.00');
    fixture.detectChanges();
    //console.log(compiled.querySelector('span')?.innerText);

    expect(compiled.querySelector('span')?.innerText).toBe('5000.00 +');
    expect(component.resultText()).toBe('10.00'); // 👈 actualizo la expectativa al nuevo valor
    expect(component.subResultText()).toBe('5000.00');
    expect(component.lastOperator()).toBe('+');
  });

  it('should have 19 calculator buttons', () => {
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator buttons with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    //const buttonByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));

    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent).toBe('C');
    expect(buttons[1].textContent).toBe('+/-');
    expect(buttons[2].textContent).toBe('%');
    expect(buttons[3].textContent).toBe('÷');
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);

    expect(mockCalculatorService.constructorNumber).toHaveBeenCalledWith('=');
  })

  it('should display result text correctly', () => {
    mockCalculatorService.resulText.and.returnValue('123');
    mockCalculatorService.subResulText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('x');
    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('456 x');
  });

});
