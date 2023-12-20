export class Removable {
	#scale; // set by setter
	// handlers
	#mouseDownHandler;
	#mouseUpHandler;
	// used in stop/cleanup
	#handle;

	constructor({ handle, remove }) {
		this.#handle = handle;
		this.#mouseDownHandler = (e) => {
			// noop
		};
		this.#mouseUpHandler = (e) => {
			remove();
		};
		this.#handle.addEventListener('mousedown', this.#mouseDownHandler);
		this.#handle.addEventListener('mouseup', this.#mouseUpHandler);
	}
	set scale(value){
		this.#scale = value;
	}
	stop() {
		this.#handle.removeEventListener('mousedown', this.#mouseDownHandler);
		this.#handle.removeEventListener('mouseup', this.#mouseUpHandler);
	}
}
