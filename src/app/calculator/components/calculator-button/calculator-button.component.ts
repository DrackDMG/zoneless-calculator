import { ChangeDetectionStrategy, Component, HostBinding, input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
  //encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent{
  public isComand = input(false, {
    transform: (value: boolean | string) => value === '' || value === 'true'
  });

  public doubleSize = input(false, {
    transform: (value: boolean | string) => value === '' || value === 'true'
  });

   @HostBinding('class.w-2/4') get doubleSizeStyle(){
     return this.doubleSize();
   }

}
