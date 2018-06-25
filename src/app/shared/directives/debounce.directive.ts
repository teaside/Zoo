import {Directive, Input, Output, EventEmitter, ElementRef, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { fromEvent } from 'rxjs';
import { map,  debounceTime } from 'rxjs/operators';

@Directive({
 selector: '[debounce]'
})

export class DebounceDirective implements OnInit {
 @Input() delay: number = 500;
 @Output() func: EventEmitter<any> = new EventEmitter();

 constructor(private elementRef: ElementRef) {
 }

 ngOnInit(): void {
   let eventStream = fromEvent(this.elementRef.nativeElement, 'keyup')
   .pipe(
     debounceTime(this.delay)
    )
  

     eventStream.subscribe(input => this.func.emit(input));
 }
}