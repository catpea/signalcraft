import { html, svg, text, list, update } from "domek";
//import { Removable } from './cable/Removable.js';
import { Selectable } from './link/Selectable.js';
import Base from './Base.js';

export default class Link extends Base {

  start({link, view }){
    const {Shortcuts, Api, Nodes, Junctions, Selection, Cable} = view.application;

    console.log('LINK', link.content);

    const sourceNode = (link.sourceType=='Junction'?Junctions:Nodes) .get(link.sourceNode);
    const targetNode = (link.targetType=='Junction'?Junctions:Nodes) .get(link.targetNode);

    if(!sourceNode) return console.error('sourceNode (${link.sourceType}) not found, datafile may contain links to nodes that have neen deleted');
    if(!targetNode) return console.error('targetNode (${link.targetType}) not found, datafile may contain links to nodes that have neen deleted');

    const sourcePort = sourceNode.Output       .get(link.sourcePort);
    const targetPort = targetNode.Input        .get(link.targetPort);

    if([sourceNode,targetNode,sourcePort,targetPort].some(o=>o==undefined)) {
      console.log('MISSING DATA', {sourceNode,targetNode,sourcePort,targetPort});
    }

    let x1 = sourceNode.x + sourcePort.x;
    let y1 = sourceNode.y + sourcePort.y;
    let x2 = targetNode.x + targetPort.x;
    let y2 = targetNode.y + targetPort.y;

    this.el.CableZone = svg.line({
      class:'cable-line-zone',
      x1, y1, x2, y2,
      strokeLinecap: 'round',
      // vectorEffect: 'non-scaling-stroke',
    });

    this.el.Cable = svg.line({
      class:'cable-line',
      style:'pointer-events: none;', // NOTE: we must disable this line, to let CableZone fully take over
      x1, y1, x2, y2,
      // stroke: "white",
      // fill: 'red',
      // 'width': 5,
      // 'stroke-width': 5,
      strokeLinecap: 'round',
      vectorEffect: 'non-scaling-stroke',
    });

    this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));

    this.cleanup(      sourceNode.observe('x',      (v)=>update([this.el.Cable, this.el.CableZone], { x1:v+sourcePort.x }))     );
    this.cleanup(      sourceNode.observe('y',      (v)=>update([this.el.Cable, this.el.CableZone], { y1:v+sourcePort.y }))     );
    this.cleanup(      targetNode.observe('x',      (v)=>update([this.el.Cable, this.el.CableZone], { x2:v+targetPort.x }))     );
    this.cleanup(      targetNode.observe('y',      (v)=>update([this.el.Cable, this.el.CableZone], { y2:v+targetPort.y }))     );

    view.scene.insertBefore(this.el.Cable, view.scene.firstChild.nextSibling);
    view.scene.insertBefore(this.el.CableZone , view.scene.firstChild.nextSibling);

    const selectable = new Selectable({
      handle: this.el.CableZone,
      action: e=>{
        const selectingMultiple = Shortcuts.isSelecting(e);
        if(selectingMultiple){
          Api.toggleSelect(link);
        }else{ // user simply chose a new selection
          Api.deselectAll();
          Api.toggleSelect(link);
        }
      }
    });
    this.cleanup(()=>selectable.stop());


    this.cleanup( Selection.observe('changed', ({data}) => {
      if(data.has(link.id)){
        this.el.Cable.classList.add('selected');
        this.el.CableZone.classList.add('selected');
      }else{
        this.el.Cable.classList.remove('selected');
        this.el.CableZone.classList.remove('selected');
      }
		}))

  } // start

}
