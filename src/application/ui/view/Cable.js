import { html, svg, text, list, update } from "./tools/domek.js";

export default class Cable {
  #application;

  #cleanup = [];
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

    const sourceNode = this.#application.Nodes.find(node=>node.id == this.#link.sourceNode);
    const sourcePort = sourceNode.Output.find(port=>port.id==this.#link.sourcePort);
    const targetNode = this.#application.Nodes.find(node=>node.id == this.#link.targetNode);
    const targetPort = targetNode.Input.find(port=>port.id==this.#link.targetPort);

    let x1 = sourceNode.x + sourcePort.x;
    let y1 = sourceNode.y + sourcePort.y;
    let x2 = targetNode.x + targetPort.x;
    let y2 = targetNode.y + targetPort.y;

    this.el = svg.line({ x1, y1, x2, y2, stroke: "white"});

    this.#cleanup.push(      sourceNode.observe('x',      (v)=>update(this.el, { x1:v+sourcePort.x }))     );
    this.#cleanup.push(      sourceNode.observe('y',      (v)=>update(this.el, { y1:v+sourcePort.y }))     );
    this.#cleanup.push(      targetNode.observe('x',      (v)=>update(this.el, { x2:v+targetPort.x }))     );
    this.#cleanup.push(      targetNode.observe('y',      (v)=>update(this.el, { y2:v+targetPort.y }))     );

    // This is untested, adding ports live was advanced functionality untested at development.
    this.#cleanup.push(      sourcePort.observe('x',      (v)=>update(this.el, { x1:sourceNode.x+v }))     );
    this.#cleanup.push(      sourcePort.observe('y',      (v)=>update(this.el, { y1:sourceNode.y+v }))     );
    this.#cleanup.push(      targetPort.observe('x',      (v)=>update(this.el, { x2:targetNode.x+v }))     );
    this.#cleanup.push(      targetPort.observe('y',      (v)=>update(this.el, { y2:targetNode.y+v }))     );

    // console.log('%cTODO: now monitor sourceNode sourcePort targetNode targetPort for changes but only to x and y and when chnages occur update(el)', "color: gold; background: red;");
  }

  start() {
  }

  stop() {
    this.el.remove()
    this.#cleanup.map(x=>x());
  }

}
