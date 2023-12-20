export class Movable {
  #container;
  #handle;
  #read;
  #write;
  #scale; // NOTE: set by a setter in this class, it is externaly set as view scale may change
  // local variables
  #dragging = false;
  #initialPosition = { x: 0, y: 0 };
  // handlers for cleanup
  #mouseDownHandler;
  #mouseMoveHandler;
  #mouseUpHandler;
  constructor({ container, handle, read, write }) {
    this.#container = container;
    this.#handle = handle;
    this.#read = read;
    this.#write = write;
    this.#mouseDownHandler = (e) => {
      // Remember where mouse touched down
      this.#initialPosition.x = e.clientX;
      this.#initialPosition.y = e.clientY;
      // Enable dragging
      this.#dragging = true;
      this.#container.addEventListener('mousemove', this.#mouseMoveHandler);
    };
    this.#mouseMoveHandler = (e) => {
      // NOTE: this code has been tested and it works. //
      // Start from beginning, using "" to have dx available throughout
      let dx = 0;
      let dy = 0;
      // Substract initial position from current cursor position to get relative motion, motion relative to initial touchdown
      dx = e.clientX - this.#initialPosition.x;
      dy = e.clientY - this.#initialPosition.y;
      // Add a scaled version of the node
      dx = dx + (this.#read('x') * this.#scale);
      dy = dy + (this.#read('y') * this.#scale);
      // Apply Scale Transformation To Everything
      dx = dx / this.#scale;
      dy = dy / this.#scale;
      // Final Asignment
      this.#write('x', dx);
      this.#write('y', dy);
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
  set scale(value){
    this.#scale = value;
  }
  stop() {
    this.#handle.removeEventListener('mousedown', this.#mouseDownHandler);
    this.#container.removeEventListener('mousemove', this.#mouseMoveHandler);
    this.#container.removeEventListener('mouseup', this.#mouseUpHandler);
  }
}
