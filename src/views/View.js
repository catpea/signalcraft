import panzoom from "panzoom";
import React from "jsx-dom";

export default class View {
  application;

  #name;

  #element;
  #svg;
  #scene;

  #unsubscribe = [];

  constructor(name, element) {
    console.log({ name, element });
    this.#name = name;
    this.#element = element;
  }

  start() {
    console.log('VIEW STARTING');
    this.#svg = this.#installCanvas();
    this.#scene = this.#installScene();
    panzoom(this.#scene, { smoothScroll: false });

    // const div = document.createElement("div");
    // this.#element.appendChild(div);
    //
    //
    // this.application.Nodes.forEach(node=>{
    //   const txt = document.createTextNode(`HELLO: ${this.#name} + ${node.id}`);
    //   div.appendChild(txt);
    //   // this.#createNode(node);
    // })

    console.log(`The size of this.application.Nodes is ${this.application.Nodes.size()}`);
    this.application.Nodes.forEach(node=>{
      this.#createNode(node);



    })

    const grandCentral = {
      "Setup bgColor": (v) => this.#svg.querySelector(".background").setAttributeNS(null, "fill", v),
      'Nodes created ...': this.#createNode,
      'Nodes deleted ...': this.#deleteNode,
      // 'setup .backgroundColor 2': v => this.#svg.getElementById("backgroundColor").setAttribute("fill", v),
      // 'click .button.edit':   this.#something,
      // 'click .button.delete': 'destroy',
      // 'node *': this.#updateNode,
      // 'nodes *': this.#updateNodes,
    };
    this.application.integrate(this, grandCentral);
  }

  stop() {
    this.#unsubscribe.map((o) => o());
    this.#element.empty();
  }

  #installCanvas() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttributeNS(null, "style", "border: 1px solid gold;");
    svg.setAttributeNS(null, "width", "100%");
    svg.setAttributeNS(null, "height", "666");

    this.#element.appendChild(svg);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);

    const lineargradient = document.createElementNS("http://www.w3.org/2000/svg", "lineargradient");
    lineargradient.setAttributeNS(null, "id", "Gradient2");
    defs.appendChild(lineargradient);

    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttributeNS(null, "offset", "0%");
    stop.setAttributeNS(null, "stop-color", "#1d2b3a");
    lineargradient.appendChild(stop);

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttributeNS(null, "offset", "100%");
    stop2.setAttributeNS(null, "stop-color", "#1c293b");
    lineargradient.appendChild(stop2);

    return svg;
  }

  #installScene() {
    const scene = document.createElementNS("http://www.w3.org/2000/svg", "g");
    scene.setAttributeNS(null, "id", "scene");
    this.#svg.appendChild(scene);

    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect2.setAttributeNS(null, "class", "background");
    rect2.setAttributeNS(null, "x", "0");
    rect2.setAttributeNS(null, "y", "0");
    rect2.setAttributeNS(null, "width", 11_000);
    rect2.setAttributeNS(null, "height", 8_000);
    rect2.setAttributeNS(null, "fill", "silver");
    scene.appendChild(rect2);

    const vertical1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    vertical1.setAttributeNS(null, "x1", "100");
    vertical1.setAttributeNS(null, "y1", "100");
    vertical1.setAttributeNS(null, "x2", "100");
    vertical1.setAttributeNS(null, "y2", "200");
    vertical1.setAttributeNS(null, "stroke", "white");

    scene.appendChild(vertical1);

    const horizontal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    horizontal1.setAttributeNS(null, "x1", "50");
    horizontal1.setAttributeNS(null, "y1", "150");
    horizontal1.setAttributeNS(null, "x2", "150");
    horizontal1.setAttributeNS(null, "y2", "150");
    horizontal1.setAttributeNS(null, "stroke", "white");

    scene.appendChild(horizontal1);

    return scene;
  }

  #deleteNode({ node: o }) {
    const node = this.#svg.getElementById(o.id);
    node.remove();
  }

  #createNode({ item }) {

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', item.id);
    g.setAttribute('transform', `translate(${item.horizontalPosition},${item.verticalPosition})`);
    this.#scene.appendChild(g);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('class', 'interactive');
    rect.setAttribute('width', item.nodeWidth);
    rect.setAttribute('height', item.nodeHeight);
    rect.setAttribute('ry', '5');
    rect.setAttribute('fill', item.backgroundColor);
    rect.setAttribute('dfill', 'url(#Gradient2)');
    g.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('class', 'interactive');
    text.setAttribute('x', '90');
    text.setAttribute('y', '25');
    text.setAttribute('font-size', '12px');
    text.setAttribute('fill', '#fff');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('font-family', 'Arial');
    g.appendChild(text);

    const text2 = document.createTextNode('Geometry');
    text.appendChild(text2);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'interactive');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', 'cyan');
    g.appendChild(circle);

    const text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text3.setAttribute('class', 'interactive');
    text3.setAttribute('x', '10');
    text3.setAttribute('y', '55');
    text3.setAttribute('font-size', '10px');
    text3.setAttribute('fill', '#fff');
    text3.setAttribute('font-family', 'Arial');
    g.appendChild(text3);

    const text4 = document.createTextNode('Geometry');
    text3.appendChild(text4);

    const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle2.setAttribute('class', 'interactive');
    circle2.setAttribute('cx', item.nodeWidth);
    circle2.setAttribute('cy', '50');
    circle2.setAttribute('r', '5');
    circle2.setAttribute('fill', 'magenta');
    g.appendChild(circle2);

    const monitor = item.monitor((key, value, item)=>{
      this.#updateNode({item, key, value});
    });

    this.#unsubscribe.push( monitor );

  }

  #updateNode({ item, key, value }) {
    const element = this.#svg.getElementById(item.id);
    element.setAttributeNS(null, "transform", `translate(${item.horizontalPosition},${item.verticalPosition})`);
  }
}
