import {computedFrom, autoinject, Container, noView} from 'aurelia-framework';
import {DynamicExpressionBindingBehavior} from './dynamic-expression-binding-behavior';
import {ViewFactory} from 'aurelia-templating'

// import {powerOfGod} from './super-resource';

// @powerOfGod('./wtf')
// @noView
export class Welcome {
  heading: string = 'Welcome to the Aurelia Navigation App';
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computedFrom('lalala')
  get huh() {
    return ''
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate(): boolean {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}

/*
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
*/
