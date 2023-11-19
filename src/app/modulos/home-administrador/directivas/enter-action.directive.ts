import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appEnterAction]'
})
export class EnterActionDirective {

  constructor(private el: ElementRef) { }

  @Input() ubicacion:any

  @Output() FlechasEvent = new EventEmitter<any>;
  @Output() EcapeEvent = new EventEmitter<any>;
  @Output() EnterEvent = new EventEmitter<any>;

  @HostListener('document:keyup', ['$event'])
  KeyUpEvent(event: KeyboardEvent) {
    console.log(event)
    if(event.code === "ArrowRight"){
      this.FlechasEvent.emit('derecha')
    }
    if(event.code === "ArrowLeft"){
      this.FlechasEvent.emit('izquierda')
    }
    if(event.code === "Enter"){
      this.EnterEvent.emit(this.ubicacion)
    }
    if(event.code === "Escape"){
      this.EcapeEvent.emit()
    }

  }

  //Code
  ///ArrowRight
  ///ArrowLeft
  ///Enter
  ///Escape

}
