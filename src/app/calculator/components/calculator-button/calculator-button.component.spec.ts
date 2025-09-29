import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';


@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="underline">1</span>
    </calculator-button>
  `

})
class TestComponent {

}


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
    //console.log(compiled);
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

  it('should emit onClick', () => {
    const spy = spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(spy).toHaveBeenCalled();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then to false when keyBoardPressedStyle is called with a machine key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyBoardPressedStyle('1');
    expect(component.isPressed()).toBe(true);
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 100);
  });

  it('should no set isPressed to true aif key is not a machine key', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyBoardPressedStyle('2');
    expect(component.isPressed()).toBe(false);
  });

  it('should display proyected content', () => {
    const testFixture = TestBed.createComponent(TestComponent);
    const testCompiled = testFixture.nativeElement as HTMLDivElement;
    expect(testCompiled.innerText).toContain('1');
    expect(testCompiled.querySelector('.underline')).toBeTruthy();
  });

});
