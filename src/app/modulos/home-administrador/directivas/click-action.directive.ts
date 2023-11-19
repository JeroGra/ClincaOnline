import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickAction]'
})
export class ClickActionDirective {

  @Input() log:any;
  
  constructor(private el: ElementRef) { }

  @Output() logSelecEvent = new EventEmitter<any>;

  @HostListener('click') Click(){
    this.el.nativeElement.style.color = '#22577A'
    this.el.nativeElement.style.background = '#80ED99'
    if(this.el.nativeElement.style.fontWeight === 'bolder'){
      this.el.nativeElement.style.fontWeight = ''
    }else{
      this.el.nativeElement.style.fontWeight = 'bolder'
    }
    
    this.logSelecEvent.emit(this.log)

  }

}
