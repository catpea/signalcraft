import oneOf from "oneof";
import { html, svg, text, list, update } from "domek";


export default class Container extends Component {

  constructor(setup) {
    super(setup);
  }

  draw() {

    setup.main = this;
    this.#setup = setup;
    this.el = svg.g({ 'transform': `translate(${this.node.x}, ${this.node.y})`, });


    this.backgroundRectangle = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: this.node.nodeWidth, height: this.size, fill: this.node.backgroundColor, stroke: 'black', });
    this.el.appendChild( this.backgroundRectangle )

    this.cleanup(

      // PLEASE NOTE THAT THIS WRITES TO THE NODE, after measuring the rectangle size
      this.node.Input.observe('created', (v)=>this.node.nodeHeight = this.size),
      this.node.Input.observe('removed', (v)=>this.node.nodeHeight = this.size),
      this.node.Output.observe('created', (v)=>this.node.nodeHeight = this.size),
      this.node.Output.observe('removed', (v)=>this.node.nodeHeight = this.size),

      // PLEASE NOTE the .observe will trigger instantly upon subscription to reliably deliver the value.
      this.node.observe('x', (v)=>update(this.el, { 'transform': `translate(${this.node.x}, ${this.node.y})`, })),
      this.node.observe('y', (v)=>update(this.el, { 'transform': `translate(${this.node.x}, ${this.node.y})`, })),
      this.node.observe('nodeHeight',              (v)=>update( this.backgroundRectangle, {size: v})),
      this.node.observe('nodeWidth',               (v)=>update( this.backgroundRectangle, {width: v})),
      this.node.observe('depthLevel',              (v)=>update( this.el, {zIndex: v})),

    ); // unsubscribe


  }

}
