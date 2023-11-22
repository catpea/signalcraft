// import h from "h";
import React from "jsx-dom";
import { v4 as uuid } from "uuid";

import templateHtml from "./template.html";

class BasicNode {
  type = "basic";
  w = 200;
  x = 0;
  y = 0;

  colors = [];

  constructor() {
    this.colors = new Array(5)
      .fill(0, 0, 5)
      .map((o) => `hsl(${Math.random() * 360}, 20%, 35%)`);
    console.log(this.colors);
  }

  #h = 0;
  get h() {
    return this.#h;
  }
  set h(v) {
    this.#h = v;
  }
}

class NodeProperties extends BasicNode {
  #properties = [];

  constructor() {
    super();
  }

  addProperty(v) {
    this.#properties.push(v);
  }
}

class Node extends NodeProperties {
  id = null;
  name = "Holla!";

  constructor() {
    super();
    this.id = uuid();
    this.x = Math.random() * 11_000;
    this.y = Math.random() * 8_000;

    this.addProperty();
  }
}

export default class SignalcraftViewElement extends HTMLElement {
  #unsubscribe = [];

  #rootElement;
  #svgElement;
  #svgDefs;

  #viewBox;
  #pan;

  #signalcraft;

  constructor() {
    super();
    this.#signalcraft = globalThis.signalcraft;
    // this.attachShadow({ mode: "open" });
    const div1 = document.createElement("div");

    this.shadowRootX = this.appendChild(div1);
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
    await this.#templateInitialization();
    // await this.#sleep(1000);
    await this.#installPanAndZoom();
    // await this.#injectNodes();
    await this.#monitorDatabase();
  }

  async #templateInitialization() {
    const template = document.createElement("template");
    template.innerHTML = templateHtml;

    const documentFragment = this.shadowRootX.appendChild(
      template.content.cloneNode(true)
    );

    this.#rootElement = this.shadowRootX.firstChild;



    this.#svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.#svgElement.setAttributeNS(null, 'style', 'border: 1px solid gold;');
    this.#svgElement.setAttributeNS(null, "viewBox", `0 0 555 555`);
    this.#svgElement.setAttributeNS(null, 'width', '555');
    this.#svgElement.setAttributeNS(null, 'height', '555');
    this.#rootElement.appendChild(this.#svgElement);

    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect2.setAttributeNS(null, 'class', 'background');
    rect2.setAttributeNS(null, 'x', '0');
    rect2.setAttributeNS(null, 'y', '0');
    rect2.setAttributeNS(null, 'width', '11000');
    rect2.setAttributeNS(null, 'height', '8000');
    rect2.setAttributeNS(null, 'fill', 'red');
    this.#svgElement.appendChild(rect2);

    const circle3 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle3.setAttributeNS(null, 'cx', '150');
    circle3.setAttributeNS(null, 'cy', '150');
    circle3.setAttributeNS(null, 'r', '50');
    this.#svgElement.appendChild(circle3);

    const circle4 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle4.setAttributeNS(null, 'cx', '250');
    circle4.setAttributeNS(null, 'cy', '250');
    circle4.setAttributeNS(null, 'r', '50');
    this.#svgElement.appendChild(circle4);



    // this.#svgElement = this.shadowRootX.querySelector("svg");
    // this.#svgDefs = this.#svgElement.querySelector("defs");
  }



  async #installPanAndZoom() {

    const aspectRatio = this.#svgElement.width.baseVal.value / this.#svgElement.height.baseVal.value;
    this.#viewBox = { x: 0, y: 0, width: 555, height: 555 / aspectRatio };
    this.#pan = { enabled: false, start: { x: 0, y: 0 } };
    this.#svgElement.addEventListener("mousedown", (event) => {
      const isBackground = event.target.classList.contains("background");
      if (!isBackground) return;
      this.#pan.enabled = true;
      this.#pan.start.x = event.clientX;
      this.#pan.start.y = event.clientY;
    });
    window.addEventListener("mousemove", (event) => {
      if (!this.#pan.enabled) return;
      var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
      var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;
      this.#viewBox.x += (this.#pan.start.x - event.clientX) * scaleX;
      this.#viewBox.y += (this.#pan.start.y - event.clientY) * scaleY;
      this.#pan.start.x = event.clientX;
      this.#pan.start.y = event.clientY;
      this.#svgElement.setAttribute( "viewBox", `${this.#viewBox.x} ${this.#viewBox.y} ${this.#viewBox.width} ${ this.#viewBox.height }` );
    });

    this.#svgElement.addEventListener("mouseup", (event) => {
      this.#pan.enabled = false;
    });
    this.#svgElement.addEventListener("wheel", (event) => {
      event.preventDefault();
      var scale = Math.pow(1.1, event.deltaY > 0 ? 1 : -1);
      this.#viewBox.width *= scale;
      this.#viewBox.height *= scale;
      this.#svgElement.setAttribute(
        "viewBox",
        `${this.#viewBox.x} ${this.#viewBox.y} ${this.#viewBox.width} ${
          this.#viewBox.height
        }`
      );
    });
  }




  async #monitorDatabase() {
    const updateNode = (o) => {};

    const appendNode = (o) => {
      this.#svgElement.appendChild(
        <g id={o.id} transform={`translate(${o.x},${o.y})`}>
          <rect class="interactive" width={o.w} height="80" ry="5" fill={o.colors[0]} />
          <text class="interactive" x="90" y="25" font-size="12px" fill="#fff" text-anchor="middle" font-weight="bold" font-family="Arial" > Geometry </text>
          <circle class="interactive" cx="0" cy="50" r="5" fill="cyan" />
          <text class="interactive" x="10" y="55" font-size="10px" fill="#fff" font-family="Arial" > Geometry </text>
          <circle class="interactive" cx={o.w} cy="50" r="5" fill="magenta" />
        </g>
      );
    };

    this.#unsubscribe.push(
      this.#signalcraft.setup.subscribe(
        "backgroundColor",
        (backgroundColor) => {
          const node = this.#svgElement.querySelector(".background");
          node.setAttribute("fill", backgroundColor);
        }
      )
    );

    this.#unsubscribe.push(
      this.#signalcraft.edges.subscribe((list) => {
        // Draw lines
      })
    );

    this.#unsubscribe.push(
      this.#signalcraft.nodes.subscribe((list) => {
        const newItems = list.filter(
          (o) => !this.#svgElement.getElementById(o.id)
        );
        const oldItems = list.filter((o) =>
          this.#svgElement.getElementById(o.id)
        );
        console.log(
          "Currently have " +
            newItems.length +
            " new items and " +
            oldItems.length +
            " old ones."
        );
        newItems.forEach((item) => appendNode(item));
        oldItems.forEach((item) => updateNode(item));

        // this.shadowRootX.appendChild(
        //   <div id={"a" + (2 + 2)}>
        //     <p>Hello World</p>
        //   </div>
        // );
      })
    );

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
