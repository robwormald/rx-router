/// <reference path="../jspm_packages/github/reactivex/rxjs@0.0.0-prealpha.1/dist/es6/RxNext.d.ts" />
/// <reference path="../typings/rx/rx" />

import Rx from 'rx';
import RouteRecognizer from 'route-recognizer';

let {Observable, Observer,Subject} = Rx;


const getHash =(url) => {
    let [host, path] = url.split('#');
    return path; 
}

export class RxRouter {
  private routeMatcher: RouteRecognizer;
  navigationStream: Rx.Observable<any>;
  matchedRoutes: Rx.Observable<any>;
  unmatchedRoutes: Rx.Observable<any>;
  constructor(){
    this.routeMatcher = new RouteRecognizer();
    this.navigationStream = Observable.fromEvent(window, 'hashchange')
      .map(event => event.newURL)
      .map(getHash)
      .map(path => this.routeMatcher.recognize(path));
    
    this.matchedRoutes = this.navigationStream.filter(handler => (handler));
    this.unmatchedRoutes = this.navigationStream.filter(handler => !(handler))
  }
  
  route(...config){
    this.routeMatcher.add(config);
  }
  
  navigate(url){
    
  }
}

export * from './rx-view'