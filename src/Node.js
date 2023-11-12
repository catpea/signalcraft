export default class Node {
  #name;
  #operation;
  #x;
  #y;
  #inputs;
  #outputs;
  #subscribers;

  constructor(name, operation, x, y) {
    this.#name = name;
    this.#type = type;
    this.#data = data;

    this.#x = x;
    this.#y = y;

    this.#inputs = [];
    this.#outputs = [];

    this.#subscribers = [];
  }

  dump(){
    return {
      name: this.#name,
      operation: this.#operation,
      x: this.#x,
      y: this.#y,
      inputs: this.#inputs,
      outputs: this.#outputs,
      subscribers: this.#subscribers,
    }
  }

  get inputs() {
    return this.#inputs;
  }

  get outputs() {
    return this.#outputs;
  }



  get type() {
    return this.#type;
  }

  set type(value) {
    this.#type = value;
    this.notifySubscribers("type", value);
  }

  

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
    this.notifySubscribers("name", value);
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = value;
    this.notifySubscribers("x", value);
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    this.#y = value;
    this.notifySubscribers("y", value);
  }



  subscribe(callback) {
    this.#subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.#subscribers = this.#subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }
  notifySubscribers(propertyName, newValue) {
    this.#subscribers.forEach((subscriber) => {
      subscriber(propertyName, newValue);
    });
  }




  evaluate() {
    console.log(`evaluate() called on ${this.#name} which has ${this.#inputs.length} dependencies (${this.#inputs.map(i=>i.name).join(', ')}) that will be evaluated first.`);
      let result = null;

     // Basic arithmetic operations for demonstration
     if (typeof this.#operation === "function") {
       result = this.#inputs.reduce((sum, input) => this.#operation(sum, input.evaluate()), 0);
     } else if (this.#operation === "add") {
       result = this.#inputs.reduce((sum, input) => sum + input.evaluate(), 0);
     } else if (this.#operation === "multiply") {
       result = this.#inputs.reduce((product, input) => product * input.evaluate(), 1);
     } else {
       // Default to a constant value if no operation specified
       result = parseFloat(this.#operation) || 0;
     }
     console.log(`${this.#name} returning result of: ${result}`);

     return result;
   }



}
