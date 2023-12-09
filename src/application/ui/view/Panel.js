import oneOf from "oneof";
import { html, svg, text, list, update } from "../domek/domek.js";










class Panel extends Component {
  constructor(setup) {
    super(setup);
    this.el = svg.g({ 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, });
    setup.main = this;

    const caption = new Caption({...setup, name:'caption bar', size:64});
    this.append(caption);


    const replyPod = new Pod({...setup,  name:'output pod', data: setup.node.Reply});
    this.append(replyPod);

    const inputPod = new Pod({...setup,  name:'input pod', data: setup.node.Input});
    this.append(inputPod);

    // this.shadowRectangle = svg.rect({ x: 10, y:10, filter: `url(#shadow-primary)`, ry: 5, width: this.node.nodeWidth, height: this.size, fill:  'black', });
    // this.el.appendChild( this.shadowRectangle )

    this.backgroundRectangle = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: this.node.nodeWidth, height: this.size, fill: this.node.backgroundColor, stroke: 'black', });
    this.el.appendChild( this.backgroundRectangle )



    // PLEASE NOTE THAT THIS WRITES TO THE NODE, after measuring the rectangle size
    this.wipe(      this.node.Input.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Input.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Reply.observe('created', (v)=>this.node.nodeHeight = this.size   )  );
    this.wipe(      this.node.Reply.observe('removed', (v)=>this.node.nodeHeight = this.size   )  );

    // PLEASE NOTE the .observe will trigger instantly upon subscription to reliably deliver the value.
    this.wipe(      this.node.observe('horizontalPosition',      (v)=>update(this.el, { 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, }))     );
    this.wipe(      this.node.observe('verticalPosition',        (v)=>update(this.el, { 'transform': `translate(${this.node.horizontalPosition}, ${this.node.verticalPosition})`, }))     );
    // this.wipe(      this.node.observe('backgroundColor',         (v)=>update( this.backgroundRectangle, {fill:v})   )  );
    this.wipe(      this.node.observe('nodeHeight',              (v)=>update( this.backgroundRectangle, {size: v}) ));
    this.wipe(      this.node.observe('nodeWidth',               (v)=>update( this.backgroundRectangle, {width: v}) ));
    this.wipe(      this.node.observe('depthLevel',              (v)=>update( this.el, {zIndex: v}) )); // mimic bring-to-top

    // ANNOy
    // console.info('TODO: Hey, maybe Pods should be measured here, and store in in input/reply???')
    // console.info('TODO: make me draggable, mimic bring to top')

  }

  draw() {
  }

}

class Composer {
  #root;
  #node;
  #view;
  constructor(setup) {
    this.#node = setup.node;
    this.#view = setup.view;
    this.#root = setup.root;
    this.#root = new Panel({...setup, name:'main panel', padd: 3});
  }
  get root() {
    return this.#root.el;
  }
  start() {
    // console.log(`SIZE OF ${this.#node.type} is ${this.#root.size}`);
    this.#root.start();
  }
}

export default Composer;
