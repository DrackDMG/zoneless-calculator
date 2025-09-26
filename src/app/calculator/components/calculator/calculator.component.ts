import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
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

  handleClick(key: string){
    console.log({key});
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyBoardEvent( event: KeyboardEvent){
    this.handleClick(event.key)

  }


}
