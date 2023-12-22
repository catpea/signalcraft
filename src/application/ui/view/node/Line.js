import { svg } from "domek";
import { Connectable } from './line/Connectable.js';
import Component from "./Component.js";

export default class Line extends Component {
	setup() {
		this.el.Line = svg.rect({ class: 'panel-line', ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
		this.el.LineText = svg.text({ class: `panel-line-text`, x: this.x + (this.width * .02), y: this.y + (this.height - (this.height / 5))  }, this.data.name);
		this.children.map(child => child.setup())
		let moveDown = (this.height / 2);
		let moveHorizontally = 10;
		if(this.data.direction == 'input') {
			const x = this.x - moveHorizontally;
			const y = this.y + moveDown;
			this.el.Port = svg.circle({ class: 'panel-line-port', cx: x, cy: y, r: 8, height: this.height / 3 });
			this.data.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.y = y; // IMPORTANT: the geometric component sets wire coordinates here
		} else {
			const x = this.x + this.width + moveHorizontally;
			const y = this.y + moveDown;
			this.el.Port = svg.circle({ class: 'panel-line-port', cx: x, cy: y, r: 8, height: this.height / 3 });
			this.data.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.y = y; // IMPORTANT: the geometric component sets wire coordinates here
		}
		//NOTE: all ports must have an address consisting of node.id:port:id, used in Cable connecting
		this.el.Port.dataset.portAddress = [ this.data.kind, 'Node', this.parent.data.id, this.data.id].join(':');

		this.cleanup( this.view.application.Selection.observe('changed', ({data}) => {
      if(data.has(this.parent.data.id)){
        // this.el.Panel.classList.add('selected');
				Object.values(this.el).map(el=>el.classList.add('selected'))

      }else{
        // this.el.Panel.classList.remove('selected');
				Object.values(this.el).map(el=>el.classList.remove('selected'))

      }
    }))

		this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));
	}
	render() {
		this.group.appendChild(this.el.Line);
		this.group.appendChild(this.el.LineText);
		this.group.appendChild(this.el.Port);

		if(this.data.direction == 'input') {
			// this is an input port, it cannot be connectable
		}else{
			const connectable = new Connectable({
				container: window, // <g> element representing an SVG scene
				handle: this.el.Port,
				canvas: this.view.scene,
				node: this.parent.data,
				port: this.data,
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

		this.children.map(child => child.render())
	}
	update() {
		update(this.el.Line, {})
	}
}
