import InputCollection from "../input/InputCollection.js";
import ReplyCollection from "../reply/ReplyCollection.js";

/*
  A type is a Visual Programming Node: When creating a vpl node you are actually creating an instance of a type.
  We must use dynamic generation here (as opposed to getter and setters) becasue there are many properties that need verbose setup and withut automation the classes become unreadable
*/

export default class Type {

  #id;
  #category;
  #name;

  Input = new InputCollection();
  Reply = new ReplyCollection();

  get id(){
    return this.#id;
  }

  constructor(category, name){
    this.#category = category;
    this.#name = name;
    this.#id = `${category}/${name}`;
  }

}
