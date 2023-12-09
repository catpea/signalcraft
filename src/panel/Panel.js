import oneOf from "oneof";
import { html, svg, text, list, update } from "../domek/domek.js";

class Component   {
  el;

  #name = null; // name, spaces allowed
  #main = null; // root parent object
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

    const setup = Object.assign({}, {node:null, view:null, root:null, padd:3, size:0, data:null, main:null, name:null}, conf);

    this.#name = setup.name;
    this.#main = setup.main;
    this.#home = setup.home;
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

  get isRoot(){ return this.#home == null;}
  get name(){ return this.#name;}
  get padd(){ return this.#padd;}

  set home(v){ this.#home = v;}
  get home(){ return this.#home;}

  set main(v){ this.#main = v;}
  get main(){ return this.#main;}

  set list(v){ this.#list = v;}
  get list(){ return this.#list;}

  get node(){ return this.#node;}
  get data(){ return this.#data;}


  get containers(){
    if(this.isRoot) return [this];
    return [ ...this.#home.containers,  this.#home ]
  }
  get aboveAll(){
    if(this.isRoot) return [this];
    return [ ...this.#home.aboveAll, ...this.#home.list.slice(0, this.#home.list.indexOf(this) ) ]
  }
  get above(){
    if(this.isRoot) return [];
    return [ ...this.#home.list.slice(0, this.#home.list.indexOf(this) ) ]
  }

  get top(){
    if(this.isRoot) return 0;
    const topPadding = this.#padd;
    const sizeOfAllAbove = this.above.reduce((total,item)=>total+item.size, 0);
    const paddOfAllAbove =  this.above.length * this.#padd
    return this.#home.top + topPadding + sizeOfAllAbove + paddOfAllAbove ;//+ sizeOfAllAbove + paddOfAllAbove
  }
  get size(){
    return this.#size + this.#list.reduce((total, child) => total + (child.size), 0) + ((this.#padd) * (this.#list.length + 1));
  }

  get width(){
    return this.node.nodeWidth - this.containers.slice(1).reduce((total,item)=>total+item.padd*2, 0);
  }

  get left(){
    return   this.containers.slice(1).reduce((total,item)=>total+item.padd, 0);
  }

  start() {
    // // console.log('Calling start on ',  this.#node.type, this.#list);
    this.draw();
     this.#list.map( o => o.start() )
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
  }
  draw() {
    this.el = svg.rect({ x:this.left , y:this.top, ry: 3, width: this.width, height: this.size, fill:'transparent', Xfill: `url(#panel-primary)`,  });
    this.main.el.appendChild( this.el )

    let port;
    if(this.data.direction == 'out'){
      port = svg.circle({ cx:this.width + 10, cy:this.top + (this.size/2), r: 8, height: this.size, fill: oneOf([`url(#socket-primary)`,`url(#socket-error)`]),  filter: `url(#socket-shadow)`});
    }else{
      port = svg.circle({ cx:this.left - 5, cy:this.top + (this.size/2), r: 8, height: this.size, fill: oneOf([`url(#socket-primary)`,`url(#socket-error)`]),  filter: `url(#socket-shadow)`});
   }
    this.main.el.appendChild( port )
  }
}

class Caption extends Component {
  constructor(setup) {
    super(setup, {size: 32});
  }
  draw() {
    // console.log('Caption', this.top);
    this.el = svg.rect({ x:this.left, y:this.top, ry: 3, width: this.node.nodeWidth-(this.padd*2), height: this.size, fill: `url(#panel-caption)`, });

    const captionNode = svg.text({ x:this.left, y:this.top + (this.size - (this.size/10) ), style: 'font-size: 2rem;', fill: `url(#panel-text)`});
    const cationText = document.createTextNode(this.node.type);
    captionNode.appendChild(cationText);

    this.main.el.appendChild( this.el )
    this.main.el.appendChild( captionNode )
  }
}

class Pod extends Component {
  constructor(setup) {
    super(setup);
    this.data.forEach( (data,index) => this.append( new Line({...setup,  name:  `pod line ${index}`, data, size:32}) ));
  }

  draw() {
    // console.log('Pod!', this.top);
    this.el = svg.rect({ x:this.left, y:this.top, ry: 3, width: this.node.nodeWidth-(this.padd*2), height: this.size, fill:'transparent', Xfill: `url(#panel-pod)`, stroke: 'black', });
    this.main.el.appendChild( this.el )
  }
}

class Panel extends Component {
  constructor(setup) {
    super(setup);
    this.el = svg.g({ 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, });
    setup.main = this;

    const caption = new Caption({...setup, name:'caption bar', size:64});
    this.append(caption);


    const replyPod = new Pod({...setup,  name:'output pod', data: setup.node.Reply});
    this.append(replyPod);

    const inputPod = new Pod({...setup,  name:'input pod', data: setup.node.Input});
    this.append(inputPod);

    // this.shadowRectangle = svg.rect({ x: 10, y:10, filter: `url(#shadow-primary)`, ry: 5, width: this.node.nodeWidth, height: this.size, fill:  'black', });
    // this.el.appendChild( this.shadowRectangle )

    this.backgroundRectangle = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: this.node.nodeWidth, height: this.size, fill: this.node.backgroundColor, stroke: 'black', });
    this.el.appendChild( this.backgroundRectangle )



    // PLEASE NOTE THAT THIS WRITES TO THE NODE, after measuring the rectangle size
    this.wipe(      this.node.Input.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Input.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Reply.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Reply.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );

    // PLEASE NOTE the .observe will trigger instantly upon subscription to reliably deliver the value.
    this.wipe(      this.node.observe('horizontalPosition',      (v)=>update(this.el, { 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, }))     );
    this.wipe(      this.node.observe('verticalPosition',        (v)=>update(this.el, { 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, }))     );
    // this.wipe(      this.node.observe('backgroundColor',         (v)=>update( this.backgroundRectangle, {fill:v})   )  );
    this.wipe(      this.node.observe('nodeHeight',              (v)=>update( this.backgroundRectangle, {size: v}) ));
    this.wipe(      this.node.observe('nodeWidth',               (v)=>update( this.backgroundRectangle, {width: v}) ));
    this.wipe(      this.node.observe('depthLevel',              (v)=>update( this.el, {zIndex: v}) )); // mimic bring-to-top

    // ANNOy
    // console.info('TODO: Hey, maybe Pods should be measured here, and store in in input/reply???')
    // console.info('TODO: make me draggable, mimic bring to top')

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
    this.#root = new Panel({...setup, name:'main panel', padd: 3});
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
