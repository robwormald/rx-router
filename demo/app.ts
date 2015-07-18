/// <reference path="../src/rx-router"/>
import 'zone.js'
import 'reflect-metadata'
import 'es6-shim'

import {RxRouter, RxView} from '../src/rx-router';
import {Component, View, bootstrap} from 'angular2/angular2'

@Component({
    selector: 'test-view'
})
@View({
    template: '<div>test view</div>'
})
class TestView {}

@Component({
    selector: 'app-view'
})
@View({
    template: '<div>app view</div>'
})
class AppView {}


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
        router.state('test',{ path: "/test", component: TestView });
        router.state('app',{ path: "/app", component: AppView })
    }
}



bootstrap(DemoApp,[RxRouter]).catch(err => console.log(err));

