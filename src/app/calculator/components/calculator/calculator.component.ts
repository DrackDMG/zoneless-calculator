import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '(document:keyup)': 'handleKeyBoardEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string){
    console.log({key});
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyBoardEvent( event: KeyboardEvent){
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      'Enter': '=',
      'Escape': 'c',
      '*': 'x',
      '/': '÷',
      '-': '-',
      '+': '+',
      '.': '.',
    };

    const keyValue = keyEquivalents[key] ?? key;


    this.handleClick(keyValue);

    this.calculatorButtons().forEach( button => {
      button.keyBoardPressedStyle(keyValue);
    });
  }


}
