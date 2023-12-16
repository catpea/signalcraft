import ReactiveArray from '../../../system/ReactiveArray.js';
import ReactiveObject from '../../../system/ReactiveObject.js';
import { html } from "domek";

export default class Component {

  el = {}; // container of elements

  name;
  data;
  view;

  isRoot = true; // by being added it is no longer a root container
  root = null; // reference to root
  parent = null;

	children = [];
  #cleanup = [];

  constructor(name, {view}={}){
    this.root = this;
    this.name = name;
    this.view = view;
  }

  get #above(){
    if(this.isRoot) return [this];
    const selfIndex = this.parent.children.indexOf(this);
    return [...this.parent.children.slice(0, selfIndex )];
  }

	add(child) {
    child.isRoot = false; // by being added it is no longer a isRoot container
    child.root = this.root;
    child.parent = this;
    child.view = this.view; // the view is spread to all children and children of children...
    if(!child.data) child.data = this.data; // the data is spread to all children and children of children...
    child.group = this.group; // the group is spread to all children and children of children...
    this.children.push(child);
    return this;
	}

  get siblings(){
    return this.parent?this.parent.children.filter(child=>child!==this):[];
  }
  get all(){
    return [...this.children, ...flatten(this.children.map( child => child.all)) ];
  }

  setup(){
    this.children.map(child=>child.setup())
  }

	setData(data) {
    this.data = data;
    return this;
	}

	setView(view) {
    this.view = view;
    return this;
	}

  cleanup(...arg){
    this.#cleanup.push(...arg);
  }

}

function isPercentValue(input){
  let output = false;
  if ( (typeof input == 'string') && input.endsWith('%') ) output = true;
  return output;
}
