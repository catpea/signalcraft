export default class Component   {
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






  get view(){ return this.#view;}
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
