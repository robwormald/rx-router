import {Directive, Attribute} from 'angular2/src/core/annotations/decorators';
import {DynamicComponentLoader, ComponentRef, ElementRef} from 'angular2/core';

@Directive({selector: 'rx-view'})
export class RxView {
    constructor(private _elementRef:ElementRef, private _loader: DynamicComponentLoader){
        console.log(this._loader)
    }
}