import { html, svg, text, list, update, front } from "domek";

import Base from './Base.js';

//import { Removable } from './junction/Removable.js';
import { Focus } from './junction/Focus.js';
import { Selectable } from './junction/Selectable.js';
import { Connectable } from './node/port/Connectable.js';
import { Movable } from './junction/Movable.js';

export default class Junction extends Base {

  start({junction, view }){
    const {Shortcuts, Api, Nodes, Selection, Cable} = view.application;

    this.el.Group = svg.g();
    this.cleanup(junction.observe('x',v=>update(this.el.Group, {'transform':`translate(${v},${junction.y})`} )));
    this.cleanup(junction.observe('y',v=>update(this.el.Group, {'transform':`translate(${junction.x},${v})`} )));


    this.el.Junction = svg.circle({ class: 'junction-caption', cx: 0, cy: 0, r: 24 });
    this.el.OmniPort = svg.circle({ class: 'junction-port', cx: 0, cy: 0, r: 8 });


    this.el.OmniPort.dataset.portAddress = [junction.port('input').kind, 'Junction', junction.id, junction.port('input').id].join(':');

    this.el.Group.appendChild( this.el.Junction )
    this.el.Group.appendChild( this.el.OmniPort )

    const movable = new Movable({
      container: window,  // <g> element representing an SVG scene
         handle: this.el.Junction, // <rect> that is the caption of a window meant to be dragged
				   read: (property) => junction[property],
          write: (property, value) =>junction[property] = value,
    });
		this.cleanup(view.observe('transform', v=>movable.scale = v.scale));
		this.cleanup(()=>movable.stop());

    const selectable = new Selectable({
      handle: this.el.Junction,
      action: e=>{
        const selectingMultiple = Shortcuts.isSelecting(e);
        if(selectingMultiple){
          Api.toggleSelect(junction);
        }else{ // user simply chose a new selection
          Api.deselectAll();
          Api.toggleSelect(junction);
        }
      }
    });
    this.cleanup(()=>selectable.stop());
    this.cleanup( view.application.Selection.observe('changed', ({data}) => {
			if(data.has(junction.id)){
				this.el.Junction.classList.add('selected');
				this.el.OmniPort.classList.add('selected');
			}else{
				this.el.Junction.classList.remove('selected');
				this.el.OmniPort.classList.remove('selected');
			}
		}))

    const focus = new Focus({
      handle: this.el.Junction,
      action: e=>{
        front(this.el.Group)
      }
    });
    this.cleanup(()=>focus.stop());







    const connectable = new Connectable({
      container: window, // <g> element representing an SVG scene
      handle: this.el.OmniPort,
      canvas: view.scene,
      node: junction,
      port: junction.port('output'),
      createConnector: ({targetKind, targetType, sourceNode, sourcePort, targetNode, targetPort}) => {
        if(targetKind=='Input') view.application.Connectors.create({sourceType:'Junction', targetType, sourceNode, sourcePort, targetNode, targetPort })

      },
      createJunction: ({x,y,  sourceNode, sourcePort}) => {
        const junction = view.application.Junctions.create({properties:{ x,y }});
        const targetNode = junction.id;
        const targetPort = junction.port('input').id;
        view.application.Connectors.create({ sourceType:'Junction', targetType:'Junction' ,sourceNode, sourcePort, targetNode, targetPort });
      },
    });
    this.cleanup(view.observe('transform', v=>connectable.scale = v.scale));
    this.cleanup(()=>connectable.stop());










    view.scene.appendChild( this.el.Group )


   } // start

}
