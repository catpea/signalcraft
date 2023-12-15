import { html, svg, text, list, update } from "domek";

export default class Cable {
  el={};
  #cleanup = [];
  // #link;
  // #view;
  // #root;
  // #name;
  // #size;
  // #main;
  // #home;
  // #padd;

  constructor() {}

  start({link, view }){

    const sourceNode = view.application.Nodes .id(link.sourceNode);
    const targetNode = view.application.Nodes .id(link.targetNode);
    const sourcePort = sourceNode.Output       .id(link.sourcePort);
    const targetPort = targetNode.Input        .id(link.targetPort);

    let x1 = sourceNode.x + sourcePort.x;
    let y1 = sourceNode.y + sourcePort.y;
    let x2 = targetNode.x + targetPort.x;
    let y2 = targetNode.y + targetPort.y;

    this.el.Cable = svg.line({
      class:'cable-line line-ant-trail',
      x1, y1, x2, y2,
      stroke: "white",
      fill: 'transparent',
      'stroke-width': 2,
      'vector-effect': 'non-scaling-stroke',
    });

    this.#cleanup.push(      sourceNode.observe('x',      (v)=>update(this.el.Cable, { x1:v+sourcePort.x }))     );
    this.#cleanup.push(      sourceNode.observe('y',      (v)=>update(this.el.Cable, { y1:v+sourcePort.y }))     );
    this.#cleanup.push(      targetNode.observe('x',      (v)=>update(this.el.Cable, { x2:v+targetPort.x }))     );
    this.#cleanup.push(      targetNode.observe('y',      (v)=>update(this.el.Cable, { y2:v+targetPort.y }))     );

    view.scene.appendChild( this.el.Cable );

  }

  stop() {
    this.el.Cable.remove()
    this.#cleanup.map(x=>x());
  }

}
