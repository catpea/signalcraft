import { html, svg, text, list, update } from "domek";
//import { Removable } from './cable/Removable.js';
import { Selectable } from './cable/Selectable.js';
import Base from './Base.js';

export default class Cable extends Base {

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

    this.el.CableClick = svg.line({
      class:'cable-line-ghost',
      x1, y1, x2, y2,
      strokeLinecap: 'round',
      // vectorEffect: 'non-scaling-stroke',
    });

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

    this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));

    this.cleanup(      sourceNode.observe('x',      (v)=>update([this.el.Cable, this.el.CableClick], { x1:v+sourcePort.x }))     );
    this.cleanup(      sourceNode.observe('y',      (v)=>update([this.el.Cable, this.el.CableClick], { y1:v+sourcePort.y }))     );
    this.cleanup(      targetNode.observe('x',      (v)=>update([this.el.Cable, this.el.CableClick], { x2:v+targetPort.x }))     );
    this.cleanup(      targetNode.observe('y',      (v)=>update([this.el.Cable, this.el.CableClick], { y2:v+targetPort.y }))     );

    view.scene.insertBefore(this.el.CableClick , view.scene.firstChild.nextSibling);
    view.scene.insertBefore(this.el.Cable, view.scene.firstChild.nextSibling);

    const selectable = new Selectable({
      handle: this.el.CableClick,
      action: e=>{
        const selectingMultiple = Shortcuts.isSelecting(e);
        if(selectingMultiple){
          Dream.toggleSelect(link);
        }else{ // user simply chose a new selection
          Dream.deselectAll();
          Dream.toggleSelect(link);
        }
      }
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

}
