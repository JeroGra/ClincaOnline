import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColorHover]'
})
export class ColorHoverDirective {
  @Input() color = '';
  @Input() background = '';

  constructor(private el: ElementRef) {}

  // Con @HostListener podemos acceder a eventos del DOM, más info en → https://angular.io/api/core/HostListener
  @HostListener('mouseenter') onMouseEnter() {
    // En este ejemplo, tomamos el valor color del estilo del elemento y lo reemplazamos por appHighligh o (||) "red" en caso de que llegue vacío.
    this.el.nativeElement.style.color = this.color || 'red';
    this.el.nativeElement.style.background = this.background || 'red';
  }

  // Tarea: Modificar el código para que reciba por input un valor al que vuelva el color cuando se sale el mouse o dejar #000 como default.
  @HostListener('mouseleave') onMouseExit() {
    this.el.nativeElement.style.color = '#000';
    this.el.nativeElement.style.background = '#fff'
  }


}
