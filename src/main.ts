/// <reference path="../jspm_packages/github/aurelia/framework@0.17.0/aurelia-framework.d.ts"/>

import 'regenerator/runtime';
import 'bootstrap';
import {Aurelia} from 'aurelia-framework';

export function configure(aurelia:Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(a => a.setRoot());
}
