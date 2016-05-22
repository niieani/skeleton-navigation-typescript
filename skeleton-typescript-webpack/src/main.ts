import {Aurelia} from 'aurelia-framework';
import {bootstrap} from 'aurelia-bootstrapper-webpack';

// font-awesome requires some fonts and thus cannot be required from within the View
import './material-design-icons.css';

bootstrap((aurelia: Aurelia): void => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-materialize-bridge', bridge => bridge.useAll())

  const rootElem = document.body;
  aurelia.start().then(() => aurelia.setRoot('app', rootElem));
  rootElem.setAttribute('aurelia-app', '');
});
