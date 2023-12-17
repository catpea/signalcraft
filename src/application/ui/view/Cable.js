import { html, svg, text, list, update } from "domek";
//import { Removable } from './cable/Removable.js';
import { Selectable } from './cable/Selectable.js';

export default class Cable {
  el={};
  #cleanup = [];
  constructor() {}

  start({link, view }){
    const {Shortcuts, Dream, Nodes, Selection, Cable} = view.application;

    const sourceNode = Nodes .id(link.sourceNode);
    const targetNode = Nodes .id(link.targetNode);
    const sourcePort = sourceNode.Output       .id(link.sourcePort);
    const targetPort = targetNode.Input        .id(link.targetPort);

    let x1 = sourceNode.x + sourcePort.x;
    let y1 = sourceNode.y + sourcePort.y;
    let x2 = targetNode.x + targetPort.x;
    let y2 = targetNode.y + targetPort.y;

    this.el.Cable = svg.line({
      class:'cable-line',
      // class:'cable-line line-ant-trail',
      x1, y1, x2, y2,
      // stroke: "white",
      // fill: 'red',
      // 'width': 5,
      // 'stroke-width': 5,
      strokeLinecap: 'round',
      vectorEffect: 'non-scaling-stroke',
    });

    this.cleanup(      sourceNode.observe('x',      (v)=>update(this.el.Cable, { x1:v+sourcePort.x }))     );
    this.cleanup(      sourceNode.observe('y',      (v)=>update(this.el.Cable, { y1:v+sourcePort.y }))     );
    this.cleanup(      targetNode.observe('x',      (v)=>update(this.el.Cable, { x2:v+targetPort.x }))     );
    this.cleanup(      targetNode.observe('y',      (v)=>update(this.el.Cable, { y2:v+targetPort.y }))     );

    view.scene.appendChild( this.el.Cable );

    // this removes link
    // const removable = new Removable({
    //   handle: this.el.Cable,
    //   remove: ()=> view.application.Links.remove(link.id),
    // });
    // this.cleanup( ()=>removable.stop() );

    const selectable = new Selectable({
      handle: this.el.Cable,
      active: e=>Shortcuts.isSelecting(e),
      action: e=>Dream.toggleSelect(link),
    });
    this.cleanup(()=>selectable.stop());


    this.cleanup( Selection.observe('changed', ({data}) => {
      if(data.has(link.id)){
        this.el.Cable.classList.add('selected');
      }else{
        this.el.Cable.classList.remove('selected');
      }
		}))

  } // start

  cleanup(...arg){
    this.#cleanup.push(...arg);
  }

  stop() {
    this.#cleanup.map(x=>x());
    this.el.Cable.remove();
  }

}
