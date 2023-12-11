export class Draggable {
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

  constructor({ container, draggable, handle, scale, node }) {

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
      dx = dx + (this.#node.x * this.#scale());
      dy = dy + (this.#node.y * this.#scale());

      // Apply Scale Transformation To Everything
      dx = dx / this.#scale();
      dy = dy / this.#scale();

      // Final Asignment
      this.#node.x = dx;
      this.#node.y = dy;

      // End
      dx = 0;
      dy = 0;

      // Reset, because the cursor has moved and is in a new position now.
      this.#initialPosition.x = e.clientX;
      this.#initialPosition.y = e.clientY;
     };

    this.#mouseUpHandler = (e) => {
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
