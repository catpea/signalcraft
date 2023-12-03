import { html, svg, text, list, update } from "../domek/domek.js";

class Component   {
  el;

  #data = null;
  #home = null;
  #size = -1;
  #padd = -1;
  #list = [];
  #view = null;
  #node = null;
  #root = null;
  #wipe = [];

  constructor(conf) {
    const setup = Object.assign({}, {node:null, view:null, root:null, padd:3, size:0, data:null}, conf);
    this.#data = setup.data;
    this.#size = setup.size;
    this.#padd = setup.padd;
    this.#view = setup.view;
    this.#node = setup.node;
    this.#root = setup.root;
  }

  append(component){
    component.home = this;
    this.#list.push(component);
  }

  set home(v){ this.#home = v;}
  get home(){ return this.#home;}
  get node(){ return this.#node;}
  get data(){ return this.#data;}

  get size(){
    return this.#size + this.#list.reduce((total, child) => total + (child.size), 0) + (this.#padd * (this.#list.length + 1));
  }

  start() {
    this.draw()
  }

  draw() {
  }

  stop() {
    this.el.remove()
    this.#wipe.map(x=>x());
  }

  wipe(...arg){
    this.#wipe.push(...arg);
  }

















};

class Line extends Component {
  constructor(setup) {
    super(setup, {size: 32});
    this.el = svg.g();

    // note a line has a dot!
  }
}

class Caption extends Component {
  constructor(setup) {
    super(setup, {size: 32});
    this.el = svg.g();
  }
}

class Pod extends Component {
  constructor(setup) {
    super(setup);
    this.el = svg.g();

    this.data.forEach( item => this.append( new Line({...setup, item, size:32}) ));


  }
}

class Panel extends Component {
  constructor(setup) {
    super(setup);

    const caption = new Caption({...setup, size:32});
    this.append(caption);

    const inputPod = new Pod({...setup, data: setup.node.Input});
    this.append(inputPod);

    const replyPod = new Pod({...setup, data: setup.node.Reply});
    this.append(replyPod);

    this.backgroundRectangle = svg.rect({ class: 'interactive', ry: 5, width: this.node.nodeWidth, height: this.size, fill: this.node.backgroundColor, stroke: 'black', });
    this.el = svg.g({ 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, });
    this.el.appendChild( this.backgroundRectangle )

    // PLEASE NOTE THAT THIS WRITES TO THE NODE, after measuring the rectangle size
    this.wipe(      this.node.Input.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Input.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Reply.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Reply.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );

    // PLEASE NOTE the .observe will trigger immiately upon subscription to reliably deliver the value.
    this.wipe(      this.node.observe('horizontalPosition',      (v)=>update(this.el, { 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, }))     );
    this.wipe(      this.node.observe('verticalPosition',        (v)=>update(this.el, { 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, }))     );
    this.wipe(      this.node.observe('backgroundColor',         (v)=>update( this.backgroundRectangle, {fill:v})   )  );
    this.wipe(      this.node.observe('nodeHeight',              (v)=>update( this.backgroundRectangle, {height: v}) ));
    this.wipe(      this.node.observe('nodeWidth',               (v)=>update( this.backgroundRectangle, {width: v}) ));
    this.wipe(      this.node.observe('depthLevel',              (v)=>update( this.el, {zIndex: v}) )); // mimic bring-to-top

    // ANNOy
    console.info('TODO: Hey, maybe Pods should be measured here, and store in in input/reply???')
    console.info('TODO: make me draggable, mimic bring to top')

  }

  draw() {
  }

}

class Composer {
  #root;
  #node;
  #view;
  constructor(setup) {
    this.#node = setup.node;
    this.#view = setup.view;
    this.#root = setup.root;
    this.#root = new Panel(setup);
  }
  get root() {
    return this.#root.el;
  }
  start() {
    // console.log(`SIZE OF ${this.#node.type} is ${this.#root.size}`);
    this.#root.start();
  }
}

export default Composer;
