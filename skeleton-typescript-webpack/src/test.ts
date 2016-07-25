import {computedFrom, autoinject, Container} from 'aurelia-framework';
import {noView} from 'aurelia-templating';

@noView //(['./wtf'])
export class Test {
  constructor() {
    console.log('huh');
  }
}