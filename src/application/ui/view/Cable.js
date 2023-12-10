import { html, svg, text, list, update } from "./tools/domek.js";

export default class Cable {
  #application;

  #wipe = [];
  #link;
  #view;
  #root;
  #name;
  #size;
  #main;
  #home;
  #padd;

  constructor(setup) {

    this.#application = setup.link.application;

    this.#link = setup.link;
    this.#view = setup.view;
    this.#root = setup.root;
    this.#name = setup.name;
    this.#size = setup.size;
    this.#main = setup.main;
    this.#home = setup.home;
    this.#padd = setup.padd;

    //'transform': `translate(${this.node.x}, ${this.node.y})`,

    // const { sourceNode:sourceNodeId, targetNode:targetNodeId, sourcePort:sourcePortId, targetPort:targetPortId } = this.#link;
    const sourceNode = this.#application.Nodes.find(node=>node.id == this.#link.sourceNode);
    const sourcePort = sourceNode.Output.find(port=>port.id==this.#link.sourcePort);
    const targetNode = this.#application.Nodes.find(node=>node.id == this.#link.targetNode);
    const targetPort = targetNode.Input.find(port=>port.id==this.#link.targetPort);

    let x1 = sourceNode.x + sourcePort.x;
    let y1 = sourceNode.y + sourcePort.y;

    let x2 = targetNode.x + targetPort.x;
    let y2 = targetNode.y + targetPort.y;

    this.el = svg.line({ x1, y1, x2, y2, stroke: "white"});

    console.log('%cTODO: now monitor sourceNode sourcePort targetNode targetPort for changes but only to x and y and when chnages occur update(el)', "color: gold; background: red;");

    // this.backgroundRectangle = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: this.node.nodeWidth, height: this.size, fill: this.node.backgroundColor, stroke: 'black', });
    // this.el.appendChild( this.backgroundRectangle )

    // PLEASE NOTE the .observe will trigger instantly upon subscription to reliably deliver the value.
    // this.wipe(      this.node.observe('x',      (v)=>update(this.el, { 'transform': `translate(${this.node.x}, ${this.node.y})`, }))     );
    // this.wipe(      this.node.observe('y',        (v)=>update(this.el, { 'transform': `translate(${this.node.x}, ${this.node.y})`, }))     );
    //

    // // PLEASE NOTE THAT THIS WRITES TO THE NODE, after measuring the rectangle size
    // this.wipe(      this.node.Input.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    // this.wipe(      this.node.Input.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );
    //
    // this.wipe(      this.node.Output.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    // this.wipe(      this.node.Output.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );



  }

  start() {
   // this.#list.map( o => o.start() )
  }

  stop() {
    this.el.remove()
    this.#wipe.map(x=>x());
  }

  wipe(...arg){
    this.#wipe.push(...arg);
  }

}
