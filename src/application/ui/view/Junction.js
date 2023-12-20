import { html, svg, text, list, update, front } from "domek";

import Base from './Base.js';

//import { Removable } from './junction/Removable.js';
import { Focus } from './junction/Focus.js';
import { Selectable } from './junction/Selectable.js';
// import { Connectable } from './junction/Connectable.js';
import { Movable } from './junction/Movable.js';

export default class Junction extends Base {

  start({junction, view }){
    const {Shortcuts, Dream, Nodes, Selection, Cable} = view.application;


    console.log(`view/Junction got`, junction);



    this.el.Group = svg.g();
    this.cleanup(junction.observe('x',v=>update(this.el.Group, {'transform':`translate(${v},${junction.y})`} )));
    this.cleanup(junction.observe('y',v=>update(this.el.Group, {'transform':`translate(${junction.x},${v})`} )));


    this.el.Junction = svg.circle({ class: 'junction-caption', cx: 0, cy: 0, r: 24 });
    this.el.OmniPort = svg.circle({ class: 'junction-port', cx: 0, cy: 0, r: 8 });
    this.el.OmniPort.dataset.portAddress = ['Junction', junction.id, junction.port('input').id].join(':');
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
          Dream.toggleSelect(junction);
        }else{ // user simply chose a new selection
          Dream.deselectAll();
          Dream.toggleSelect(junction);
        }
      }
    });
    this.cleanup(()=>selectable.stop());
    this.cleanup( view.application.Selection.observe('changed', ({data}) => {
			if(data.has(junction.id)){
				this.el.Junction.classList.add('selected');
			}else{
				this.el.Junction.classList.remove('selected');
			}
		}))

    const focus = new Focus({
      handle: this.el.Junction,
      action: e=>{
        front(this.el.Group)
      }
    });
    this.cleanup(()=>focus.stop());


    view.scene.appendChild( this.el.Group )


   } // start

}
