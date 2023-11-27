export default class Box {
  children = [];
  parent;
  x = 0;
  y = 0;

  constructor({ w=0, h=0, padding = 5 } = {}) {
    this.width = w;
    this.height = h;
    this.padding = padding;
  }

  append(box) {
    box.parent = this;
    this.children.push(box);
  }

  get totalPadding() {
    return this.padding * (this.children.length + 1);
  }

  finalCalculate(y = 0) {
    let cumulativeHeight = y + this.padding;
    this.y = cumulativeHeight;
    this.children.forEach((child) => {
      child.finalCalculate(cumulativeHeight);
      cumulativeHeight += child.totalHeight;
    });
  }

  get totalHeight() {
    let childrenHeight = this.children.reduce((total, childBox) => total + (childBox.totalHeight || 0), 0);
    return (this.height || 0) + this.totalPadding + childrenHeight;
  }

  fill(times, conf) {
    for (let i = 0; i < times; i++) {
      this.append(new Box(conf));
    }
    return this;
  }
}
