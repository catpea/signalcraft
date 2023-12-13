if(!globalThis.VboxCounter) globalThis.VboxCounter = 1;

export class Vbox {

  id = null;
  children = [];
  y = 0;
  height = 0;
  gap = 0;
  padding = 0;
  currentY = 0;

  constructor(id, options = {}) {
    this.id = id || `vbox-${++globalThis.VboxCounter}`;

    // y-origin and dimensions
    this.y = options.y || 0;

    this.height = options.height || 0;

    // layout properties
    this.gap = options.gap || 0;
    this.padding = options.padding || 0;

    // always start placing items after the top padding
    this.currentY = this.padding;
  }

  addChild(child) {
    this.children.push(child);
    child.y = this.y + this.currentY;
    this.currentY += child.getComputedLayout().height + this.gap;
  }

  getComputedLayout(){
    // returns the total height of the VBox
    const {y, height, gap, padding, currentY, } = this;
    console.log(this.id, {y, height, gap, padding, currentY, });
    return this; // .height || (this.currentY + this.padding - this.gap);
  }

}
