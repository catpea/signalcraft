import { html, svg, text, list, update } from "../../tools/domek.js";

export class DraggableConnector {
  // Private Class Fields
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

  constructor({ container, draggable, handle, scale, node, data, main }) {

    this.#data = data;
    this.#main = main;

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
      console.log('this.#dragging');
      this.#line = svg.line({
        class:'ant-trail',
        stroke: "green",
        fill: 'transparent',
        'stroke-width': 2,
        'vector-effect': 'non-scaling-stroke',
      });
      this.#main.el.appendChild(this.#line);

      this.#container.addEventListener('mousemove', this.#mouseMoveHandler);
    };

    this.#mouseMoveHandler = (e) => {

      //                                               //
      // NOTE: this code has been tested and it works. //
      //                                               //

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
      console.log(this.#line);
      console.log(geometry);
      // End
      dx = 0;
      dy = 0;

      // Reset, because the cursor has moved and is in a new position now.
      // this.#initialPosition.x = e.clientX;
      // this.#initialPosition.y = e.clientY;
     };

    this.#mouseUpHandler = (e) => {
      this.#dragging = false;
      if(this.#line) this.#line.remove();
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
