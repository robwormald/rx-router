/// <reference path="../src/rx-router"/>
import 'zone.js'
import 'reflect-metadata'
import 'es6-shim'

import {RxRouter, RxView} from '../src/rx-router';
import {Component, View, bootstrap, bind} from 'angular2/angular2'


class TestModel {
    name:string;
    constructor(){
        console.log('model!')
        this.name = 'test'
    }
}

@Component({
    selector: 'test-view'
})
@View({
    template: '<div>test view</div>'
})
class TestView {}

@Component({
    selector: 'app-view',
    viewInjector: [TestModel]
})
@View({
    template: '<div><h1>hello {{model.name}}</h1></div>'
})
class AppView {
    model: TestModel;
    constructor(){
        this.model = {name: 'helo'};
    }
}


@Component({
    selector: 'demo-app'
})
@View({
    template: `
        <a href="#/app">app</a>
        <a href="#/test">test</a>
        <a href="#/bad">bad</a>
        <rx-view name="main"></rx-view>
    `,
    directives: [RxView, TestView, AppView]
})
class DemoApp {
    constructor(router:RxRouter){
        console.log(router)
        router.state('test',{ path: "/test", component: TestView, bindings: [bind(TestModel).toValue({name: 'foobar'})]});
        router.state('app',{ path: "/app", component: AppView })
    }
}



bootstrap(DemoApp,[RxRouter, TestModel]).catch(err => console.log(err));

