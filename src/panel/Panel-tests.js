import { html, svg, text, list } from "../domek/domek.js";


class Component {
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

    this.rect = svg.rect({
      x:0,
      y:0,
      class: 'interactive',
      ry: 5,
      width: this.node.nodeWidth,
      height: this.size,
      fill: this.node.backgroundColor,
      stroke: 'black',
    });

    this.el = svg.g({
      'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`,
    });

    this.el.appendChild( this.rect )



  }

  draw() {

    // this.el = svg.rect({
    //   class: 'interactive',
    //   ry: 5,
    //   width: this.node.nodeWidth,
    //   height: this.size,
    //   fill: this.node.backgroundColor,
    // });

  }

}


class Composer {
  #root;
  #node;
  #view;

  constructor(setup){
    this.#node = setup.node;
    this.#view = setup.view;
    this.#root = setup.root;


    this.#root = new Panel(setup);

    // create tree
    // const panel = new Panel();
    // const captionText = new Caption();
    // const inputPod = new Pod();
    // const replyPod = new Pod();
    //
    // // add variable items
    // this.#node.Input.forEach( item => inputPod.append( new Line({item, size:32}) ));
    // this.#node.Reply.forEach( item => replyPod.append( new Line({item, size:32}) ));
    //
    // // set root
    // this.#root = this.#attachTree(panel, [captionText, inputPod, replyPod]);


    // tree is in the dom

    // begin monitoring node's data
    // const grandCentral = {
    //   "Node horizontalPosition+verticalPosition": (x,y) => this.el.setAttribute('transform', `translate(${x},${y})`),
    //   "Node input update+remove":                 (data) => list(data, Line, inputPod),
    //   "Node reply update+remove":                 (data) => list(data, Line, replyPod),
    //   'Node deleted':                             (deleted) => deleted?this.stop():null,
    // };

    // this.#node.integrate(this, grandCentral);
  }
  //
  // #attachTree(component, children){
  //   let previous = component;
  //   for (const child of children) {
  //     if (Array.isArray(child)) {
  //       this.#attachTree(previous, child);
  //     }else{
  //       component.append( child );
  //     }
  //     let previous = child;
  //   }
  //   return component;
  // }

  get root(){
    return this.#root.el;
  }

  start() {
    console.log(`SIZE OF ${this.#node.type} is ${this.#root.size}`);
    this.#root.start()

  }
}

export default Composer;

//
// const ul = list("ul", Li);
// mount(document.body, ul);
// ul.update([1, 2, 3], { colors: { accent: "red" } });


// for (const y of geometry.inputs) {
//   const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//   circle.setAttribute('class', 'interactive');
//   circle.setAttribute('cx', '0');
//   circle.setAttribute('cy', y);
//   circle.setAttribute('r', '5');
//   circle.setAttribute('fill', 'cyan');
//   this.#self.appendChild(circle);
// }
