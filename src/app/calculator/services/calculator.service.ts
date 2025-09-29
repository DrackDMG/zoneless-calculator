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
      //console.log('Valor no permitido', value);
      return;
    }

    if(value === '='){
      //console.log('calcular resultado');
      this.calculateResult();
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
      if(this.resulText().includes('-') && this.resulText().length === 2){
        this.resulText.set('0');
        return;
      }
      if(this.resulText().length === 1){
        this.resulText.set('0');
        return;
      }
      this.resulText.update(current => current.slice(0, -1));
      return;
    }

    if(operators.includes(value)){
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResulText.set(this.resulText());
      this.resulText.set('0');
      return;
    }

    if(this.resulText().length >= 7){
      //console.log('limite');
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

  public calculateResult(){
    const number1 = parseFloat(this.subResulText());
    const number2 = parseFloat(this.resulText());
    let result = 0;

    switch(this.lastOperator()){
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this.resulText.set(result.toString());
    this.subResulText.set('0');

  }

}
