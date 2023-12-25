import { svg, dataset } from "domek";

import Component from "./Component.js";
import { Connectable } from './line/Connectable.js';


export default class Port extends Component {

  behavior = {
    showCaption: true,
  };

  setup(){


    let moveDown = (this.height / 2);
		let moveHorizontally = 4;

		if(this.data.port.direction == 'input') {
			const x = this.x - moveHorizontally;
			const y = this.y + moveDown;
      this.el.PortCaption = svg.text({ class: `panel-line-text`, x: this.x + this.bounds.space, y: this.y + (this.height - (this.height / 3))  }, this.data.port.name );
			this.el.Port = svg.circle({ class: `panel-line-port ${this.data.port.direction}-port`, cx: x, cy: y, r: this.bounds.radius, height: this.height / 3 });
			this.data.port.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.port.y = y; // IMPORTANT: the geometric component sets wire coordinates here
		} else {
			const x = this.x + this.width + moveHorizontally;
			const y = this.y + moveDown;
      this.el.PortCaption = svg.text({
        class: `panel-line-text border border-info`,
        textAnchor: 'end',
        x: this.width - this.bounds.space,
        y: this.y + (this.height - (this.height / 3)),
        width: this.width,
      }, this.data.port.name );
			this.el.Port = svg.circle({ class: `panel-line-port ${this.data.port.direction}-port`, cx: x, cy: y, r: this.bounds.radius, height: this.height / 3 });
			this.data.port.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.port.y = y; // IMPORTANT: the geometric component sets wire coordinates here
		}

		//NOTE: all ports must have an address consisting of node.id:port:id, used in Cable connecting
    dataset(this.el.Port, {
      portAddress: [
        this.data.port.kind,
        this.data.node.kind,
        this.data.node.id,
        this.data.port.id
      ].join(':')
    });

    this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));

    this.children.map(child=>child.setup())
  }

  render(){
    if(this.behavior.showCaption) this.group.appendChild(this.el.PortCaption);
    this.group.appendChild( this.el.Port );

    console.log(this.data.port.direction);
    if(this.data.port.direction == 'reply') {
			const connectable = new Connectable({
				container: window, // <g> element representing an SVG scene
				handle: this.el.Port,
				canvas: this.view.scene,
				node: this.data.node,
				port: this.data.port,
				createConnector: ({targetType, sourceNode, sourcePort, targetNode, targetPort}) => this.view.application.Connectors.create({ targetType, sourceNode, sourcePort, targetNode, targetPort }),
				createJunction: ({x,y,  sourceNode, sourcePort}) => {
					// first create target junction
					const junction = this.view.application.Junctions.create({properties:{ x,y }});
					const targetNode = junction.id;
					const targetPort = junction.port('input').id;
					// now create this node to the junction
					this.view.application.Connectors.create({ targetType:'Junction', sourceNode, sourcePort, targetNode, targetPort});

				},
			});
			this.cleanup(this.view.observe('transform', v=>connectable.scale = v.scale));
			this.cleanup(()=>connectable.stop());
		}

    this.children.map(child=>child.render())
  }

  update(){
    update(this.el.Port, {})
  }


}
