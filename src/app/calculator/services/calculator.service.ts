import { Injectable, signal } from '@angular/core';



const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '÷'];
const specialOperators = [ '+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resulText = signal('0');
  public subResulText = signal('0');
  public lastOperator = signal('+');

  public constructorNumber(value: string): void{
    if(![...numbers, ...operators, ...specialOperators].includes(value)){
      console.log('Valor no permitido', value);
      return;
    }

    if(value === '='){
      //TODO
      console.log('calcular resultado');
      return;
    }

    if(value === 'C'){
      this.resulText.set('0');
      this.subResulText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //TODO: revisar cuando vayan a ser negativos
    if(value === 'Backspace'){
      if(this.resulText() === '0') return;
      if(this.resulText().length === 1){
        this.resulText.set('0');
        return;
      }
      this.resulText.update(current => current.slice(0, -1));
      return;
    }

    if(operators.includes(value)){
      this.lastOperator.set(value);
      this.subResulText.set(this.resulText());
      this.resulText.set('0');
      return;
    }

    if(this.resulText().length >= 7){
      console.log('limite');
      return;
    }

    if( value === '.' && !this.resulText().includes('.')){
      if(this.resulText() === '0' || this.resulText() === ''){
        this.resulText.set('0.');
        return;
      }
      this.resulText.update(current => current + value)
      return;
    }

    if(value === '0' && (this.resulText() === '0' || this.resulText() === '-0')){
      return;
    }

    if(value === '+/-'){
      if(this.resulText().includes('-')) {
        this.resulText.update(current => current.slice(1));
        return;
      }
      this.resulText.update(current => '-' + current);
      return;
    }

    if(numbers.includes(value)){
      if(this.resulText() === '0'){
        this.resulText.set(value);
        return;
      }
      if(this.resulText() === '-0'){
        this.resulText.set('-' + value);
        return;
      }
      this.resulText.update(current => current + value)
      return;
    }
  }

}
