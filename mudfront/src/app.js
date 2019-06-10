import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: PLATFORM.moduleName('./routes/home/index'),
        nav: true,
        title: 'Welcome'
      }
    ]);

    this.router = router;
  }
}
