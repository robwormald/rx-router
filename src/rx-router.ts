/// <reference path="../jspm_packages/github/reactivex/rxjs@0.0.0-prealpha.1/dist/es6/RxNext.d.ts" />
/// <reference path="../typings/rx/rx" />

import Rx from 'rx';
import RouteRecognizer from 'route-recognizer';

let {Observable, Observer,Subject} = Rx;

import {
  Directive,
  Component,
  View,
  Attribute,
  DynamicComponentLoader,
  ComponentRef,
  ElementRef,
  Injectable,
  bind,
  Injector} from 'angular2/angular2'

console.log(Injector)
const getHash =(url) => {
    let [host, path] = url.split('#');
    return path; 
}

@Injectable()
export class RxRouter {
  private routeMatcher: RouteRecognizer;
  navigationStream: Rx.Observable<any>;
  matchedRoutes: Rx.Observable<any>;
  unmatchedRoutes: Rx.Observable<any>;
  outlet: any;
  constructor(private _loader: DynamicComponentLoader){
    this.routeMatcher = new RouteRecognizer();
    this.navigationStream = Observable.fromEvent(window, 'hashchange')
      .map(event => event.newURL)
      .map(getHash)
      .map(path => this.routeMatcher.recognize(path))
      .subscribe((state) => this.render(state))
 }
  
  render(viewState){
   let [config, ...params] = viewState;
   this.loadComponent(config.handler.component, config.handler.bindings)
   //this.state.next(views)
  }
  
  loadComponent(component, bindings){
    this.outlet.show(component, bindings)
  }
  
  state(name,config){
    this.routeMatcher.add([{path: config.path, handler: config}]);
  }
  
  registerOutlet(name:string, view: ElementRef){
    this.outlet = view;
  }
  
  navigate(url){
    
  }
}


@Directive({
  selector: 'rx-view',
  properties: ['name']
 })
export class RxView {
    name: string;
    componentRef:ComponentRef;
    constructor(private _router:RxRouter, private _elementRef:ElementRef, private _loader:DynamicComponentLoader){
       this._router.registerOutlet(this.name, this);
    }
    show(component, bindings){
      if(this.componentRef){
        this.componentRef.dispose();
        this.componentRef = null;
      }
     
      let boundBindings = Injector.resolve(bindings || [])
      
      this._loader.loadNextToLocation(component, this._elementRef,boundBindings)
        .then(componentRef => {
          this.componentRef = componentRef;
        },(err) => console.log(err))
     
    }
}
