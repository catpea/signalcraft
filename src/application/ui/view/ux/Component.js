import ReactiveArray from '../../../system/ReactiveArray.js';
import ReactiveObject from '../../../system/ReactiveObject.js';
import { svg } from "domek";

export default class Component {

  el = {}; // container of elements

  name;
  data;
  view;
  group = svg.g();

  root = true; // by being added it is no longer a root container
  parent = null;

	bounds = {
		x: 0,
		y: 0,
		width: 300,
		height: 0,
    gap: 0,
    margin: 0,
    border: 0,
    padding: 0,
	}

	children = [];

  constructor(name, {view}={}){
    this.name = name;
    this.view = view;
  }

  get #above(){
    if(this.root) return [this];
    const selfIndex = this.parent.children.indexOf(this)
    return [  ...this.parent.children.slice(0, selfIndex ) ]
    // return [  ...this.parent.#above,  ...this.parent.children.slice(0, selfIndex ) ]
  }

  get y(){
    if(this.root) return 0;
    console.log(`#above ${this.name} =`, this.#above.map(o=>o.name).join(', '),  this.#above.length, this.#above);
    return 0 +
    this.parent.y +
    this.parent.bounds.margin +
    this.parent.bounds.border +
    this.parent.bounds.padding +
    this.#above.reduce((total, child) => total + child.height , 0) +
    (this.parent.bounds.gap * this.#above.length)
  }

  get height(){
    return 0 +
    this.bounds.margin +
    this.bounds.border +
    this.bounds.padding +
      this.bounds.height +
      this.children.reduce((total, child) => total + (child.height), 0) +
      (this.bounds.gap * (this.children.length>0?this.children.length-1:0 /* not counting gap in last child as it does not have one*/)) +
    this.bounds.padding +
    this.bounds.border +
    this.bounds.margin

  }

	add(child) {
    child.root = false; // by being added it is no longer a root container
    child.parent = this;
    child.view = this.view; // the view is spread to all children and children of children...
    if(!child.data) child.data = this.data; // the data is spread to all children and children of children...
    child.group = this.group; // the group is spread to all children and children of children...
    this.children.push(child);
    return this;
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

	setBounds(data) {
    Object.assign(this.bounds, data);
    return this;
	}


}
