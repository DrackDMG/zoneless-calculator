import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'doubleSize()',
    '[class.w-1/4]': '!doubleSize()'

  },
  //encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent{

  public isPressed = signal(false);

  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isComand = input(false, {
    transform: (value: boolean | string) => value === '' || value === 'true'
  });

  public doubleSize = input(false, {
    transform: (value: boolean | string) => value === '' || value === 'true'
  });

  //  @HostBinding('class.w-2/4') get doubleSizeStyle(){
  //    return this.doubleSize();
  //  }

   handleClick(){
    if(!this.contentValue()?.nativeElement){
      return;
    }

    const value = this.contentValue()!.nativeElement.innerText.trim();
    this.onClick.emit(value);
   }

   public keyBoardPressedStyle(key:string){
    if(!this.contentValue()){
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText.trim();
    if (value === key) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
