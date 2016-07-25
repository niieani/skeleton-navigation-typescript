import {computedFrom, autoinject, Container} from 'aurelia-framework';

import {viewEngineHooks} from 'aurelia-templating';
@viewEngineHooks
@autoinject
export class BindingFunctionViewEngineHooks {
  constructor(private container: Container) {
    console.log('bfveh2', container);
  }

  beforeCompile(content, resources, compileInstruction) {
    console.log('bfveh2', content, resources, compileInstruction);
    // resources.bindingBehaviors['dynamicExpression'] = this.container.get(DynamicExpressionBindingBehavior);
  }
  afterCompile(factory) {
    // console.log('bfveh2', 'factory', factory);
  }
  beforeBind(view) {
    console.log('bfveh2', 'before-bind', view);
  }
  
  // beforeUnbind(view) {
  // }
};