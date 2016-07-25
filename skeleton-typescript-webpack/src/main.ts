import {Aurelia} from 'aurelia-framework';
// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// comment out if you don't want a Promise polyfill (remove also from webpack.config.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

import {ValueConverter, BindingBehavior, Chain, Expression, Conditional, AccessMember, AccessScope, AccessKeyed, CallMember, CallFunction, Binary, PrefixNot, LiteralArray, LiteralObject} from 'aurelia-binding';
import * as sms from 'source-map-support/browser-source-map-support';
sms.install();

function instanceofAny(obj, types: Array<any>) {
  for (let type of types) {
    if (obj instanceof type) {
      return true;
    }
  }
  return false;
}

// https://gist.github.com/niieani/240515e766fc71f92a06e5aad75ad950
// https://github.com/aurelia/binding/blob/master/src/ast.js
function deepExtractExpressions(expression, ofTypes) {
  let expressions = [];
  if (instanceofAny(expression, ofTypes)) {
    expressions.push(expression);
  }
  if (expression instanceof ValueConverter || expression instanceof BindingBehavior || expression instanceof PrefixNot) {
    expressions = expressions.concat(deepExtractExpressions(expression.expression, ofTypes));
  }
  if (expression.args) {
    // console.log('args vs allArgs', expression.args, expression.allArgs);
    // ValueConverter, BindingBehavior, CallScope, CallMember
    for (let subExpression of expression.args) {
      expressions = expressions.concat(deepExtractExpressions(subExpression, ofTypes));
    }
  }
  if (expression instanceof Chain || expression.isChain) {
    for (let subExpression of expression.expressions) {
      expressions = expressions.concat(deepExtractExpressions(subExpression, ofTypes));
    }
  }
  if (expression instanceof Conditional) {
    expressions = expressions.concat(deepExtractExpressions(expression.condition, ofTypes));
    expressions = expressions.concat(deepExtractExpressions(expression.yes, ofTypes));
    expressions = expressions.concat(deepExtractExpressions(expression.no, ofTypes));
  }
  if (expression instanceof AccessMember || expression instanceof AccessKeyed || expression instanceof CallMember) {
    expressions = expressions.concat(deepExtractExpressions(expression.object, ofTypes));
  }
  if (expression instanceof AccessKeyed) {
    expressions = expressions.concat(deepExtractExpressions(expression.key, ofTypes));
  }
  if (expression instanceof CallFunction) {
    expressions = expressions.concat(deepExtractExpressions(expression.func, ofTypes));
  }
  if (expression instanceof Binary) {
    expressions = expressions.concat(deepExtractExpressions(expression.left, ofTypes));
    expressions = expressions.concat(deepExtractExpressions(expression.right, ofTypes));
  }
  if (expression instanceof LiteralArray) {
    for (let subExpression of expression.elements) {
      expressions = expressions.concat(deepExtractExpressions(subExpression, ofTypes));
    }
  }
  if (expression instanceof LiteralObject) {
    for (let subExpression of expression.values) {
      expressions = expressions.concat(deepExtractExpressions(subExpression, ofTypes));
    }   
  }
  return expressions;
}

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  const viewResources = aurelia.resources;
  const hooks = {
    afterCompile: function (factory) {
      console.log('factory', factory);

      let expressionsToAnalyze = [];
      let instructions = factory.instructions;
      for (let instructionIdx in instructions) {
        let instruction = instructions[instructionIdx];
        let contentExpression = instruction.contentExpression;
        if (contentExpression && contentExpression.parts) {
          for (let part of contentExpression.parts) {
            if (!(part instanceof Object)) {
              continue;
            }
            expressionsToAnalyze.push(part);
            // console.log(part);
          }
        }
        let expressions = instruction.expressions;
        if (expressions) {
          for (let expression of expressions) {
            if (!expression.sourceExpression) {
              continue;
            }
            expressionsToAnalyze.push(expression.sourceExpression);
            // console.log(expression.sourceExpression);
          }
        }
      }
      for (let expression of expressionsToAnalyze) {
        let allAccessMember = deepExtractExpressions(expression, [AccessMember, AccessKeyed, AccessScope]);
        console.log(allAccessMember);
      }
    }
  };
  viewResources.registerViewEngineHooks(hooks);

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}