import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { provideZonelessChangeDetection } from '@angular/core';

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
    console.log(compiled.querySelector('span')?.innerText);

    expect(compiled.querySelector('span')?.innerText).toBe('5000.00 +');
    expect(component.resultText()).toBe('10.00'); // 👈 actualizo la expectativa al nuevo valor
    expect(component.subResultText()).toBe('5000.00');
    expect(component.lastOperator()).toBe('+');
  });
});
