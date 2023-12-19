import { html, svg, text, list, update } from "domek";
//import { Removable } from './junction/Removable.js';
// import { Selectable } from './junction/Selectable.js';
// import { Selectable } from './junction/Connectable.js';
// import { Selectable } from './junction/Movable.js';

export default class Junction {
  el={};
  #cleanup = [];
  constructor() {}

  start({junction, view }){
    const {Shortcuts, Dream, Nodes, Selection, Cable} = view.application;
   } // start

  cleanup(...arg){
    this.#cleanup.push(...arg);
  }

  stop() {
    console.log('Junction Cleanup');
    this.#cleanup.map(x=>x());
    this.el.Cable.remove();
  }

}
