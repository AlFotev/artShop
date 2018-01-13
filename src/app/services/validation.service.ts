import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

export let validUsername:boolean;

@Directive({
    selector: '[validator]'
})
export class inputValidate {
    @Input("ngModel") val: string;
    private regEx: RegExp;
    constructor(public el: ElementRef
    ) {
        this.regEx = new RegExp('/^[a-z0-9]+$/i', "i");
    }
    ngOnChanges(changes) {
        if(this.regEx.test(this.val)){
         validUsername = true;
        }else{
            validUsername = false;
        }
    }



}