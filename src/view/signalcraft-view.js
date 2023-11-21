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

  constructor(){
    this.colors = (new Array(5).fill(0,0,5)) .map(o=>`hsl(${Math.random() * 360}, 20%, 35%)`);
    console.log(this.colors);
  }

  #h = 0;
  get h(){return this.#h}
  set h(v){this.#h = v}
}


class NodeProperties extends BasicNode {
  #properties = [];

  constructor(){
    super()
  }

  addProperty(v){
    this.#properties.push(v)
  }


}

class Node extends NodeProperties {
  id = null;
  name = "Holla!";

  constructor(){
    super()
    this.id = uuid();
    this.x = Math.random() * 11_000;
    this.y = Math.random() * 8_000;

    this.addProperty()

  }

}

















class View extends HTMLElement {
  #rootElement;
  #svgElement;
  #svgDefs;

  #viewBox;
  #pan;

  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    const div1 = document.createElement("div");

    this.shadowRootX = this.appendChild(div1);
  }

  connectedCallback() {
    this.#setup();
  }

  async #setup() {
    await this.#templateInitialization();
    await this.#installPanAndZoom();
    await this.#injectNodes();
    await this.#monitorDatabase();
  }

  async #templateInitialization() {
    const template = document.createElement("template");
    template.innerHTML = templateHtml;

    const documentFragment = this.shadowRootX.appendChild(
      template.content.cloneNode(true)
    );

    this.#rootElement = this.shadowRootX.firstChild;
    this.#svgElement = this.shadowRootX.querySelector("svg");
    this.#svgDefs = this.#svgElement.querySelector("defs");
  }

  async #installPanAndZoom() {
    this.#svgElement.setAttribute("viewBox", `0 0 555 555`);

    const aspectRatio =
      this.#svgElement.width.baseVal.value /
      this.#svgElement.height.baseVal.value;
    this.#viewBox = { x: 0, y: 0, width: 555, height: 555 / aspectRatio };
    this.#pan = { enabled: false, start: { x: 0, y: 0 } };

    this.#svgElement.addEventListener("mousedown", (event) => {
      const isInteractive = event.target.classList.contains("interactive");
      console.log(event.target, { isInteractive });
      if (isInteractive) return;

      this.#pan.enabled = true;
      this.#pan.start.x = event.clientX;
      this.#pan.start.y = event.clientY;
    });

    this.#svgElement.addEventListener("mousemove", (event) => {
      if (!this.#pan.enabled) return;

      var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
      var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;

      this.#viewBox.x += (this.#pan.start.x - event.clientX) * scaleX;
      this.#viewBox.y += (this.#pan.start.y - event.clientY) * scaleY;

      this.#pan.start.x = event.clientX;
      this.#pan.start.y = event.clientY;

      this.#svgElement.setAttribute(
        "viewBox",
        `${this.#viewBox.x} ${this.#viewBox.y} ${this.#viewBox.width} ${
          this.#viewBox.height
        }`
      );
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
    console.log("Awaiting db... ... ...");
    const db = await globalThis.signalcraftDatabase;

    // this.#svgDefs.appendChild(
    //   <g id="basic">
    //      <rect class="interactive" width="222" height="80" ry="5" fill="red"/>
    //      <text class="interactive" x="90" y="25" font-size="12px" fill="#fff" text-anchor="middle" font-weight="bold" font-family="Arial">Geometry</text>
    //      <circle class="interactive" cx="0" cy="50" r="5" fill="cyan"/>
    //      <text class="interactive" x="10" y="55" font-size="10px" fill="#fff" font-family="Arial">Geometry</text>
    //      <circle class="interactive" cx="222" cy="50" r="5" fill="magenta"/>
    //    </g>
    // );

    // const updateNode = (o) => {};

    // const appendNode = (o) => {
      // this.#svgElement.appendChild(
      //   <use x={o.x} y={o.y} href="#basic"/>
      // );
     // };


    const updateNode = (o) => {};

    const appendNode = (o) => {
      this.#svgElement.appendChild(
        <g id={o.id} transform={ `translate(${o.x},${o.y})` }>
           <rect class="interactive" width={o.w} height="80" ry="5" fill={o.colors[0]}/>
           <text class="interactive" x="90" y="25" font-size="12px" fill="#fff" text-anchor="middle" font-weight="bold" font-family="Arial">Geometry</text>
           <circle class="interactive" cx="0" cy="50" r="5" fill="cyan"/>
           <text class="interactive" x="10" y="55" font-size="10px" fill="#fff" font-family="Arial">Geometry</text>
           <circle class="interactive" cx={o.w} cy="50" r="5" fill="magenta"/>
         </g>
      );
     };

    db.todos.subscribe((list) => {
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
    });

    let counter = 0
    let intervalID = setInterval(() => {
      db.todos.push( new Node() );
      if(counter > 1_000 ) clearInterval(intervalID);
      counter++
    }, 1);
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

customElements.define("sc-view", View);
