import { html, svg, text, list, update } from "domek";

export class Connectable {
	#el = {};
	#scale; // set by setter
	#dragging = false;
	#initialPosition = { x: 0, y: 0 };
	// handlers
	#mouseDownHandler;
	#mouseMoveHandler;
	#mouseUpHandler;
	// used in stop/cleanup
	#container;
	#handle;
	#geometry = {};

	constructor({ container, handle, canvas, node, port, createConnector, createJunction }) {
		this.#container = container;
		this.#handle = handle;
		this.#mouseDownHandler = (e) => {
			// Remember where mouse touched down
			this.#initialPosition.x = e.clientX;
			this.#initialPosition.y = e.clientY;
			// Enable dragging
			this.#dragging = true;
			this.#el.indicatorLine = svg.line({
				class: 'cable-line-indicator line-ant-trail',
				'stroke-width': 2,
				'vector-effect': 'non-scaling-stroke',
			});
			canvas.appendChild(this.#el.indicatorLine);
			this.#container.addEventListener('mousemove', this.#mouseMoveHandler);
		};
		this.#mouseMoveHandler = (e) => {
			// Init
			let dx = 0;
			let dy = 0;
			// Substract initial position from current cursor position to get relative motion, motion relative to initial touchdown
			dx = e.clientX - this.#initialPosition.x;
			dy = e.clientY - this.#initialPosition.y;
			// Add a scaled version of the node
			dx = dx + (port.x * this.#scale);
			dy = dy + (port.y * this.#scale);

			// Apply Scale Transformation To Everything
			dx = dx / this.#scale;
			dy = dy / this.#scale;



			// Final Asignment
			this.#geometry = {
				// origin of th eindicator line is the port
				x1: port.x+node.x,
				y1: port.y+node.y,
				// target of the indicator line is where the cursor is dragging
				x2: dx+node.x,
				y2: dy+node.y,
			};
			// the indicator is kept inside this class, the real line comes from the View
			update(this.#el.indicatorLine, this.#geometry);
			// End
			dx = 0;
			dy = 0;
		};
		this.#mouseUpHandler = (e) => {

			const isOverAnotherPort = this.#dragging && e.target && (e.target.classList.contains('panel-line-port')||e.target.classList.contains('junction-port'));
			const isOverBackground = this.#dragging && e.target && e.target.classList.contains('view-scene-background');

			if(isOverAnotherPort) {
				const portAddress = e.target.dataset.portAddress;
				const [targetKind, targetType, targetNodeId, targetPortId] = portAddress.split(':');
				const payload = {
					targetKind,
					targetType,
					sourceNode: node.id,
					sourcePort: port.id,
					targetNode: targetNodeId,
					targetPort: targetPortId
				};
				const notTheSamePort = (payload.sourcePort != payload.targetPort);
				const notTheSameNode = (payload.sourceNode != payload.targetNode);
				if(notTheSamePort && notTheSameNode) createConnector(payload);
			}

			if(isOverBackground){
					createJunction({
						x: this.#geometry.x2,
						y: this.#geometry.y2,
						sourceNode: node.id,
						sourcePort: port.id,
					});


			}


			// when mouse up, the line is always removed
      if(this.#el.indicatorLine) this.#el.indicatorLine.remove();
			this.#dragging = false;
			this.#container.removeEventListener('mousemove', this.#mouseMoveHandler);
		};
		this.#handle.addEventListener('mousedown', this.#mouseDownHandler);
		this.#container.addEventListener('mouseup', this.#mouseUpHandler);
	}
	set scale(value){
		this.#scale = value;
	}
	stop() {
		this.#handle.removeEventListener('mousedown', this.#mouseDownHandler);
		this.#container.removeEventListener('mousemove', this.#mouseMoveHandler);
		this.#container.removeEventListener('mouseup', this.#mouseUpHandler);
	}
}
