import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDColorBtn]'
})
export class DColorBtnDirective {

  constructor(private el: ElementRef) { }
  
  @Input() defaultColor = '';

  @Input() appHighlight = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
