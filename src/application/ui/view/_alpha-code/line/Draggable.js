import { html, svg, text, list, update } from "domek";

export class DraggableConnector {
	#application;
	#container;
	#draggable;
	#handle;
	#mouseDownHandler;
	#mouseMoveHandler;
	#mouseUpHandler;
	#dragging = false;
	#initialPosition = { x: 0, y: 0 };
	#scale;
	#node;
	#line;
	#data;
	#main;
	constructor({ application, container, draggable, handle, scale, node, data, main }) {
		this.#data = data;
		this.#main = main;
		this.#application = application;
		this.#container = container;
		this.#draggable = draggable;
		this.#handle = handle;
		this.#scale = scale;
		this.#node = node;
		this.#mouseDownHandler = (e) => {
			// Remember where mouse touched down
			this.#initialPosition.x = e.clientX;
			this.#initialPosition.y = e.clientY;
			// Enable dragging
			this.#dragging = true;
			this.#line = svg.line({
				class: 'ant-trail',
				stroke: "green",
				fill: 'transparent',
				'stroke-width': 2,
				'vector-effect': 'non-scaling-stroke',
			});
			this.#main.el.appendChild(this.#line);
			this.#container.addEventListener('mousemove', this.#mouseMoveHandler);
		};

		this.#mouseMoveHandler = (e) => {
			// Start from beginning, using "" to have dx available throughout
			let dx = 0;
			let dy = 0;

			// Substract initial position from current cursor position to get relative motion, motion relative to initial touchdown
			dx = e.clientX - this.#initialPosition.x;
			dy = e.clientY - this.#initialPosition.y;

			// Add a scaled version of the node
			dx = dx + (this.#data.x * this.#scale());
			dy = dy + (this.#data.y * this.#scale());

			// Apply Scale Transformation To Everything
			dx = dx / this.#scale();
			dy = dy / this.#scale();

			// Final Asignment
			const geometry = {
				x1: this.#data.x,
				y1: this.#data.y,
				x2: dx,
				y2: dy,
			};
			update(this.#line, geometry)

			// End
			dx = 0;
			dy = 0;
		};

		this.#mouseUpHandler = (e) => {
			if(this.#dragging && e.target && e.target.classList.contains('port')) {
				const portAddress = e.target.dataset.portAddress;
				const [targetNodeId, targetPortId] = portAddress.split(':');
				this.#application.Links.create({
					sourceNode: this.#node.id,
					sourcePort: this.#data.id,
					targetNode: targetNodeId,
					targetPort: targetPortId
				});
			}
      if(this.#line) this.#line.remove();
			this.#dragging = false;
			this.#container.removeEventListener('mousemove', this.#mouseMoveHandler);
		};
		this.#handle.addEventListener('mousedown', this.#mouseDownHandler);
		this.#container.addEventListener('mouseup', this.#mouseUpHandler);
	}
	stop() {
		this.#handle.removeEventListener('mousedown', this.#mouseDownHandler);
		this.#container.removeEventListener('mousemove', this.#mouseMoveHandler);
		this.#container.removeEventListener('mouseup', this.#mouseUpHandler);
	}
}
