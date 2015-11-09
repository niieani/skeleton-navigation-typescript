/// <reference path="../jspm_packages/github/aurelia/router@0.13.0/aurelia-router.d.ts"/>

import * as router from 'aurelia-router';
export class App {

  private router: router.RouteConfig;

  configureRouter(config, router: router.RouteConfig) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
