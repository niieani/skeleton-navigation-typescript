import {RouterConfiguration, RouteConfig} from 'aurelia-router';
export class ChildRouter {
  heading = 'Child Router';
  private router: RouteConfig;

  configureRouter(config:RouterConfiguration, router: RouteConfig) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',       moduleId: 'welcome',       nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',         moduleId: 'users',         nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router',  moduleId: 'child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
