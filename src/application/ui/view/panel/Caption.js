import { html, svg, text, list, update } from "../tools/domek.js";
import Component from "./base/Component.js";

export default class Caption extends Component {
  el;

  constructor(setup) {
    super(setup, {size: 32});
    this.el = svg.rect({

      class: `caption`,

      x:this.left,
      y:this.top,
      ry: 3,

      width: this.node.nodeWidth-(this.padd*2),
      height: this.size,

      fill: `url(#panel-caption)`, });
  }
  draw() {
    // console.log('Caption', this.top);

    const captionNode = svg.text({ x:this.left, y:this.top + (this.size - (this.size/10) ), style: 'font-size: 2rem; pointer-events: none;', fill: `url(#panel-text)`});
    const cationText = document.createTextNode(this.node.type);
    captionNode.appendChild(cationText);

    this.main.el.appendChild( this.el )
    this.main.el.appendChild( captionNode )
  }
}
