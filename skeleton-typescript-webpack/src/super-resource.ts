import {metadata} from 'aurelia-metadata';
import {computedFrom, autoinject, Container} from 'aurelia-framework';

import {viewEngineHooks} from 'aurelia-templating';
@viewEngineHooks
@autoinject
export class BindingFunctionViewEngineHooks {
  constructor(private container: Container) {
    console.log('bfveh', container);
  }

  beforeCompile(content, resources, compileInstruction) {
    console.log(content, resources, compileInstruction);
    // resources.bindingBehaviors['dynamicExpression'] = this.container.get(DynamicExpressionBindingBehavior);
  }
  afterCompile(factory) {
    // console.log('factory', factory);
    // let instructions = factory.instructions;
    // for (let instructionIdx in instructions) {
    //   let instruction = instructions[instructionIdx];
    //   let expression = instruction.contentExpression;
    //   if (expression && expression.parts) {
    //     for (let part of expression.parts) {
    //       if (!(part instanceof Object)) {
    //         continue;
    //       }
    //       console.log(part);
    //     }
    //   }
    //   let expressions = instruction.expressions;
    //   if (expressions) {
    //     for (let expression of expressions) {
    //       // if (!(expression instanceof Object)) {
    //       //   continue;
    //       // }
    //       console.log(expression.sourceExpression);
    //     }
    //   }
    // }
  }
  beforeBind(view) {
    console.log('before-bind', view);
  }
  
  // beforeUnbind(view) {
  // }
};

// import {viewEngineHooks} from 'aurelia-templating';
// @viewEngineHooks
// export class ViewEngineHooksResource {
//   constructor() {}

//   instance;

//   initialize(container, target) {
//     console.log('initialize; container', container, 'target', target);
//     // this.instance = container.get(target);
//   }

//   register(registry, name) {
//     console.log('register; registry', registry, 'name', name);
//     // registry.registerViewEngineHooks(this.instance);
//   }

//   load(container, target) {}

//   static convention(name) { // eslint-disable-line
//     if (name.endsWith('ViewEngineHooks')) {
//       return new ViewEngineHooksResource();
//     }
//   }
// }

// export function viewEngineHooks(target?) { // eslint-disable-line
//   let deco = function(t) {
//     metadata.define(metadata.resource, new ViewEngineHooksResource(), t);
//   };

//   return target ? deco(target) : deco;
// }


export function powerOfGod(...resources) { // eslint-disable-line
  let deco = function(t) {
    metadata.define('aurelia:view-model-require', resources, t);
  };

  return deco;
}

