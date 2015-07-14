/// <reference path="../src/rx-router"/>
import 'zone.js'
import 'reflect-metadata'
import 'es6-shim'

import {RxRouter, RxView} from '../src/rx-router';
import {Component, View, bootstrap} from 'angular2/angular2'

@Component({
    selector: 'demo-app'
})
@View({
    template: `
        <a href="#/posts/1/comments"">admin</a>
        <a href="#/posts?foo=bar">posts</a>
        <a href="#/bad">bad</a>
        <rx-view></rx-view>
    `,
    directives: [RxView]
})
class DemoApp {
    constructor(router:RxRouter){
        
        router.route({ path: "/posts", handler: 'post' });
        router.route({ path: "/posts/:id", handler: 'post' },{ path: "/comments", handler: 'postComment' })

        router.matchedRoutes.subscribe((route) => {
          console.log(route)
        })
    }
}

bootstrap(DemoApp,[RxRouter]).catch(err => console.log(err));

