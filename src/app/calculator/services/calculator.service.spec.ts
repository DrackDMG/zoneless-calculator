import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CalculatorService (zoneless)', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        CalculatorService
      ]
    });

    service = TestBed.inject(CalculatorService);
  });

  beforeAll(() => {});
  afterEach(() => {});
  afterAll(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resulText()).toBe('0');
    expect(service.subResulText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resulText, set subResulText to 0 when C is pressed', () => {

    service.resulText.set('1');
    service.subResulText.set('2');
    service.lastOperator.set('-');

    service.constructorNumber('C');

    expect(service.resulText()).toBe('0');
    expect(service.subResulText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resulText with number input', () => {

    service.constructorNumber('1');
    expect(service.resulText()).toBe('1');

    service.constructorNumber('2');
    expect(service.resulText()).toBe('12');


  });

  it('should handle operators correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('+');

    expect(service.resulText()).toBe('0');
    expect(service.subResulText()).toBe('1');
    expect(service.lastOperator()).toBe('+');
  });

  it('should calculate correctly for addition', () => {
    service.constructorNumber('1');
    service.constructorNumber('+');
    service.constructorNumber('1');
    service.constructorNumber('=');
    expect(service.resulText()).toBe('2');
  });

  it('should calculate correctly for subtraction', () => {
    service.constructorNumber('1');
    service.constructorNumber('-');
    service.constructorNumber('1');
    service.constructorNumber('=');
    expect(service.resulText()).toBe('0');
  });

  it('should calculate correctly for multiplication', () => {
    service.constructorNumber('1');
    service.constructorNumber('x');
    service.constructorNumber('1');
    service.constructorNumber('=');
    expect(service.resulText()).toBe('1');
  });

  it('should calculate correctly for division', () => {
    service.constructorNumber('1');
    service.constructorNumber('÷');
    service.constructorNumber('1');
    service.constructorNumber('=');
    expect(service.resulText()).toBe('1');
  });

  it('should handle backspace correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('Backspace');
    expect(service.resulText()).toBe('0');
  });

  it('should handle negative numbers correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('+/-');
    expect(service.resulText()).toBe('-1');
  });

  it('should handle decimal correctly', () => {
    service.constructorNumber('1');
    service.constructorNumber('.');
    expect(service.resulText()).toBe('1.');
  });

  it('should handle decimal correctly starting with 0', () => {
    service.constructorNumber('0');
    service.constructorNumber('.');
    service.constructorNumber('.');
    service.constructorNumber('.');
    service.constructorNumber('0');
    expect(service.resulText()).toBe('0.0');
  });

});
