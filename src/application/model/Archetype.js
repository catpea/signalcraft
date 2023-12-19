/*
Archetype is NODE this is where you define them
but this is not a useful node object just a definision of things that will later be used to see a reactive node
A type is a Visual Programming Node: When creating a vpl node you are actually creating an instance of a type.
We must use dynamic generation here (as opposed to getter and setters) becasue there are many properties that need verbose setup and withut automation the classes become unreadable
*/

import { v4 as uuid } from "uuid";

// NOTE: this is a plain object, a stub used to hold definitions only
export default class Archetype {
  id;
  type;
  // used in setting up reactive arrays in node (this could be upgraded to a real reactive object but outside of project scope atm)
  input = [];
  output = [];
  constructor({id, type, application}){
    // internal
    this.id = id||uuid(); // type id, for internal purposes
    // for nodes
    this.type = type; // name of the node type
  }
}
