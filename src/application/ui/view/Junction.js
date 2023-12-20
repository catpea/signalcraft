import { html, svg, text, list, update } from "domek";

import Base from './Base.js';

//import { Removable } from './junction/Removable.js';
// import { Selectable } from './junction/Selectable.js';
// import { Connectable } from './junction/Connectable.js';
import { Movable } from './junction/Movable.js';

export default class Junction extends Base {

  start({junction, view }){
    const {Shortcuts, Dream, Nodes, Selection, Cable} = view.application;


    console.log(`view/Junction got`, junction);



    this.el.Group = svg.g();
    this.cleanup(junction.observe('x',v=>update(this.el.Group, {'transform':`translate(${v},${junction.y})`} )));
    this.cleanup(junction.observe('y',v=>update(this.el.Group, {'transform':`translate(${junction.x},${v})`} )));


    this.el.Junction = svg.circle({ class: 'panel-line-port', cx: 0, cy: 0, r: 24 });
    this.el.OmniPort = svg.circle({ class: 'panel-line-port', cx: 0, cy: 0, r: 8 });
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

    view.scene.appendChild( this.el.Group )


   } // start

}
