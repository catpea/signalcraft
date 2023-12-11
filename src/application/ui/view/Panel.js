import oneOf from "oneof";
import { html, svg, text, list, update } from "./tools/domek.js";
import { Draggable } from   "./tools/Draggable.js";

import Component from "./panel/base/Component.js";
import Caption from "./panel/Caption.js";
import Pod from "./panel/Pod.js";

export default class Panel extends Component {
  constructor(setup) {
    super(setup);
    this.el = svg.g({ 'transform': `translate(${this.node.x}, ${this.node.y})`, });
    setup.main = this;

    const caption = new Caption({...setup, name:'caption bar', size:64});
    this.append(caption);


    const outputPod = new Pod({...setup,  name:'output pod', data: setup.node.Output});
    this.append(outputPod);

    const inputPod = new Pod({...setup,  name:'input pod', data: setup.node.Input});
    this.append(inputPod);

    // this.shadowRectangle = svg.rect({ x: 10, y:10, filter: `url(#shadow-primary)`, ry: 5, width: this.node.nodeWidth, height: this.size, fill:  'black', });
    // this.el.appendChild( this.shadowRectangle )

    this.backgroundRectangle = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: this.node.nodeWidth, height: this.size, fill: this.node.backgroundColor, stroke: 'black', });
    this.el.appendChild( this.backgroundRectangle )


    const draggable = new Draggable({
      container: window, // <g> element representing an SVG scene
      draggable: this.el, // <g> element that contains the window
      handle: caption.el, // <rect> that is the caption of a window meant to be dragged
      node: this.node,
      // events
      scale: o => setup.view.transform.scale,
    });

    this.wipe( draggable.stop );


    // PLEASE NOTE THAT THIS WRITES TO THE NODE, after measuring the rectangle size
    this.wipe(      this.node.Input.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Input.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Output.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Output.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );

    // PLEASE NOTE the .observe will trigger instantly upon subscription to reliably deliver the value.
    this.wipe(      this.node.observe('x', (v)=>update(this.el, { 'transform': `translate(${this.node.x}, ${this.node.y})`, }))     );
    this.wipe(      this.node.observe('y', (v)=>update(this.el, { 'transform': `translate(${this.node.x}, ${this.node.y})`, }))     );
    // this.wipe(      this.node.observe('backgroundColor',         (v)=>update( this.backgroundRectangle, {fill:v})   )  );
    this.wipe(      this.node.observe('nodeHeight',              (v)=>update( this.backgroundRectangle, {size: v}) ));
    this.wipe(      this.node.observe('nodeWidth',               (v)=>update( this.backgroundRectangle, {width: v}) ));
    this.wipe(      this.node.observe('depthLevel',              (v)=>update( this.el, {zIndex: v}) )); // mimic bring-to-top

    // ANNOy
    // console.info('TODO: Hey, maybe Pods should be measured here, and store in in input/output???')
    // console.info('TODO: make me draggable, mimic bring to top')

  }

  draw() {
  }

}
