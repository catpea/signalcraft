// import h from "h";
import React from "jsx-dom";
import panzoom from "panzoom";
import { v4 as uuid } from "uuid";

export default class SignalcraftViewElement extends HTMLElement {
  #unsubscribe = [];

  #rootElement;
  #svgElement;
  #svgScene;

  #viewBox;
  #pan;

  #signalcraft;

  constructor() {
    super();
    this.#signalcraft = globalThis.signalcraft;
    this.attachShadow({ mode: "open" });
    this.#templateInitialization();

    const grandCentral = {

      'setup bgColor':   v => this.#svgElement.querySelector(".background").setAttribute("fill", v),
      'nodes created ...': this.#appendNode,
      'nodes updated ...': v=>({/*...*/}),
      'nodes deleted ...': v=>({/*...*/}),

      // 'setup .backgroundColor 2': v => this.#svgElement.getElementById("backgroundColor").setAttribute("fill", v),
      // 'click .button.edit':   this.#something,
      // 'click .button.delete': 'destroy',
      // 'node *': this.#updateNode,
      // 'nodes *': this.#updateNodes,

    };
    this.#signalcraft.integrate(this, grandCentral);

  }

  connectedCallback() {
    this.#setup();
  }

  destroy() {
    this.#unsubscribe.map((o) => o());
  }

  #sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async #setup() {

    await this.#installPanAndZoom();
    // await this.#injectNodes();
    await this.#monitorDatabase();
  }

  async #templateInitialization() {
    const div1 = document.createElement("div");
    div1.setAttribute('class', 'bg-secondaryd rounded bg-info'); //TODO: %
    div1.setAttribute('style', 'overflow: hidden;'); //TODO: %
    const documentFragment = this.shadowRoot.appendChild( div1 );
    this.#rootElement = this.shadowRoot.firstChild;

    this.#svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.#svgElement.setAttributeNS(null, 'style', 'border: 1px solid gold;');
    // this.#svgElement.setAttributeNS(null, "viewBox", `0 0 999 666`);
    this.#svgElement.setAttributeNS(null, 'width', '100%'); //TODO: %
    this.#svgElement.setAttributeNS(null, 'height', '666');
    this.#rootElement.appendChild(this.#svgElement);

    this.#svgScene = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    this.#svgScene.setAttributeNS(null, 'id', 'scene');
    this.#svgElement.appendChild(this.#svgScene);


    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect2.setAttributeNS(null, 'class', 'background');
    rect2.setAttributeNS(null, 'x', '0');
    rect2.setAttributeNS(null, 'y', '0');
    rect2.setAttributeNS(null, 'width', 11_000);
    rect2.setAttributeNS(null, 'height', 8_000);
    rect2.setAttributeNS(null, 'fill', 'silver');
    this.#svgScene.appendChild(rect2);

    const circle3 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle3.setAttributeNS(null, 'cx', '1050');
    circle3.setAttributeNS(null, 'cy', '500');
    circle3.setAttributeNS(null, 'r', '50');
    this.#svgScene.appendChild(circle3);

    const circle4 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle4.setAttributeNS(null, 'cx', '250');
    circle4.setAttributeNS(null, 'cy', '250');
    circle4.setAttributeNS(null, 'r', '50');
    this.#svgScene.appendChild(circle4);

    const vertical1 = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    vertical1.setAttributeNS(null, 'x1', '100');
    vertical1.setAttributeNS(null, 'y1', '100');
    vertical1.setAttributeNS(null, 'x2', '100');
    vertical1.setAttributeNS(null, 'y2', '200');
    vertical1.setAttributeNS(null, 'stroke', 'white');

    this.#svgScene.appendChild(vertical1);

    const horizontal1 = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    horizontal1.setAttributeNS(null, 'x1', '50');
    horizontal1.setAttributeNS(null, 'y1', '150');
    horizontal1.setAttributeNS(null, 'x2', '150');
    horizontal1.setAttributeNS(null, 'y2', '150');
    horizontal1.setAttributeNS(null, 'stroke', 'white');

    this.#svgScene.appendChild(horizontal1);

  }



  #appendNode({node:o}) {
    console.log(`appendNode appendNode appendNode x=${o.x}`, o);
    this.#svgScene.appendChild(

      <g id={o.id} transform={`translate(${o.x},${o.y})`}>
        <rect class="interactive" width={o.w} height="80" ry="5" fill="teal" />
        <text class="interactive" x="90" y="25" font-size="12px" fill="#fff" text-anchor="middle" font-weight="bold" font-family="Arial" > Geometry </text>
        <circle class="interactive" cx="0" cy="50" r="5" fill="cyan" />
        <text class="interactive" x="10" y="55" font-size="10px" fill="#fff" font-family="Arial" > Geometry </text>
        <circle class="interactive" cx={o.w} cy="50" r="5" fill="magenta" />
      </g>

    );
  }

  async #installPanAndZoom() {
    panzoom( this.#svgScene, { smoothScroll: false })

  }


  async #monitorDatabase() {
    const updateNode = (o) => {};

    const appendNode = (o) => {

    };
    //

    // this.#unsubscribe.push(
    //
    //   this.#signalcraft.setup.subscribe(
    //     "backgroundColor",
    //     (backgroundColor) => {
    //       const node = this.#svgElement.querySelector(".background");
    //       node.setAttribute("fill", backgroundColor);
    //     }
    //   )
    //
    // );

    // this.#unsubscribe.push(
    //   this.#signalcraft.edges.subscribe((list) => {
    //     // Draw lines
    //   })
    // );
    //
    // this.#unsubscribe.push(
    //   this.#signalcraft.nodes.subscribe((list) => {
    //     const newItems = list.filter(
    //       (o) => !this.#svgElement.getElementById(o.id)
    //     );
    //     const oldItems = list.filter((o) =>
    //       this.#svgElement.getElementById(o.id)
    //     );
    //     console.log(
    //       "Currently have " +
    //         newItems.length +
    //         " new items and " +
    //         oldItems.length +
    //         " old ones."
    //     );
    //     newItems.forEach((item) => appendNode(item));
    //     oldItems.forEach((item) => updateNode(item));
    //
    //     // this.shadowRoot.appendChild(
    //     //   <div id={"a" + (2 + 2)}>
    //     //     <p>Hello World</p>
    //     //   </div>
    //     // );
    //   })
    // );

    // let counter = 0;
    // let intervalID = setInterval(() => {
    //   signalcraft.nodes.push(new Node());
    //   if (counter > 100) clearInterval(intervalID);
    //   counter++;
    //
    //   this.#signalcraft.setup.backgroundColor = `hsl(${
    //     Math.random() * 360
    //   }, 20%, 35%)`;
    // }, 666);
  }

  async #injectNodes() {
    //TODO: create all the node types in <defs>
    // and then use <use id="".../> to instantiate them in the svg.
    // then apply drag

    // add drag point
    // add selection manager

    var node = this.#svgElement.getElementById("myNode");

    var drag = {
      enabled: false,
      transform: { x: 10, y: 10 },
      start: { x: 0, y: 0 },
    };

    node.addEventListener("mousedown", (event) => {
      event.preventDefault();
      drag.enabled = true;

      var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
      var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;

      drag.start.x = event.clientX * scaleX - drag.transform.x;
      drag.start.y = event.clientY * scaleY - drag.transform.y;
    });

    window.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (!drag.enabled) return;

      var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
      var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;

      drag.transform.x = event.clientX * scaleX - drag.start.x;
      drag.transform.y = event.clientY * scaleY - drag.start.y;
      node.setAttribute(
        "transform",
        `translate(${drag.transform.x},${drag.transform.y})`
      );
    });

    window.addEventListener("mouseup", () => {
      event.preventDefault();
      drag.enabled = false;
    });
  }
}
