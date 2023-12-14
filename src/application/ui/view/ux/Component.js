import ReactiveArray from '../../../system/ReactiveArray.js';
import ReactiveObject from '../../../system/ReactiveObject.js';
import { svg } from "domek";

export default class Component {

  el = {}; // container of elements

  name;
  data;
  view;
  group = svg.g();

  isRoot = true; // by being added it is no longer a root container
  root = null; // reference to root
  parent = null;

	bounds = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
    gap: 0,
    border: 0,
    padding: 0,
    radius: 0,
	}

	children = [];

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

  get x(){
    if(this.isRoot) return 0;
    return 0
    + this.parent.x
    + this.parent.bounds.border
    + this.parent.bounds.padding
  }

  get y(){
    if(this.isRoot) return 0;
    return 0
    + this.parent.y
    + this.parent.bounds.border
    + this.parent.bounds.padding
    + this.#above.reduce((total, child) => total + child.height , 0)
    + (this.parent.bounds.gap * this.#above.length)
  }

  get width(){
    if(isPercentValue(this.bounds.width)) return this.siblings.reduce((max, sibling) => sibling.width>max?sibling.width:max, 0) * (parseInt(this.bounds.width)/100);

    return 0
    + this.bounds.border
    + this.bounds.padding
    + ( this.bounds.width || this.children.reduce((max, child) => child.width>max?child.width:max, 0) )
    + this.bounds.padding
    + this.bounds.border
  }

  get height(){
    return 0
    + this.bounds.border
    + this.bounds.padding
    + this.bounds.height
    + this.children.reduce((total, child) => total + (child.height), 0)
    + (this.bounds.gap * (this.children.length>0?this.children.length-1:0 /* not counting gap in last child as it does not have one*/))
    + this.bounds.padding
    + this.bounds.border
  }

  get radius(){
    return this.bounds.radius;
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

	setBounds(data) {
    if(Object.values(data).filter(item=>typeof item == 'string').filter(item=>!item.endsWith('%')).length) throw new Error('String without percent is not supported.')
    Object.assign(this.bounds, data);
    return this;
	}


}

function isPercentValue(input){
  let output = false;
  if ( (typeof input == 'string') && input.endsWith('%') ) output = true;
  return output;
}
