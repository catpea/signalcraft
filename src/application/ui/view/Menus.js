import oneOf from "oneof";
import { html, svg, text, list, update } from "domek";

import Navbar from "./menu/Navbar.js";
import Dropdown from "./menu/Dropdown.js";

export default class Menu {
  el;
  #cleanup = [];

  start(view){

      const navbar = new Navbar(view.name);
      navbar.setView(view);

      const dropdown = new Dropdown(`Add`);
      dropdown.setData([
        {name:'a', onClick:()=>({})},
        {name:'b', onClick:()=>({})},
      ]);
      navbar.add(dropdown);

      navbar.setup();
      navbar.render(view.element);

      this.cleanup(navbar);
  }


  stop(){
    this.#cleanup.map(x=>x());
  }
  cleanup(...arg){
    this.#cleanup.push(...arg);
  }
}
