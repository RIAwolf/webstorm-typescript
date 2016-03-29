///<reference path="../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts"/>
///<reference path="../../node_modules/typescript/lib/lib.es6.d.ts"/>
import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS, RouteConfig, AuxRoute, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {HomeComponent} from '../home/home.component'
import {Component, bind, Inject, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {provide} from "angular2/core";
import {CORSBrowserXHr} from "./cors-browser-xhr";
import {BrowserXhr} from "angular2/http";

@Component ({
    selector: '[main]',
    directives: [ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`,
    providers: []
})

@RouteConfig([
   
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
        useAsDefault: true
    }
])

export class MainComponent implements OnInit{
    constructor() {}

    ngOnInit():any {
        // this.authTicketService.getTicket();
    }
}

bootstrap(MainComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy}),
    provide(BrowserXhr, { useClass: CORSBrowserXHr })
]);