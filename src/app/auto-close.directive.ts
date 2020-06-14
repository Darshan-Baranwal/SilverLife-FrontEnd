import { Directive, ElementRef, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appAutoClose]'
})
export class AutoCloseDirective {
  constructor(private elemRef: ElementRef) { }
  @Output() autoCloseOnclickOutside = new EventEmitter<any>();

  @HostListener('document:keydown', ['$event'])
  @HostListener("document:click", ['$event']) 
  onClick(targetElement) {
    if(targetElement instanceof KeyboardEvent) {
      if(targetElement.keyCode===27){
        this.autoCloseOnclickOutside.emit(null);
      }
    }else{
      if(!this.elemRef.nativeElement.contains(targetElement.target) && targetElement.target.className.includes('modal')){
          this.autoCloseOnclickOutside.emit(null);
        }
  }
}
}
