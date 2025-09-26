import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resulText = signal('0');
  public subResulText = signal('0');
  public lastOperator = signal('+');

}
