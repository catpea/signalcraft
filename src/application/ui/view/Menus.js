import oneOf from "oneof";
import { html, svg, text, list, update } from "domek";

import Base from './Base.js';

import Navbar from "./menu/Navbar.js";
import Dropdown from "./menu/Dropdown.js";
import Offcanvas from "./menu/Offcanvas.js";

export default class Menus extends Base {

  start(view){

      const navbar = new Navbar(view.name);
      navbar.setView(view);

      const file = new Dropdown(`File`);
      navbar.add(file);

      // const dropdown = new Dropdown(`Add`);
      // navbar.add(dropdown);


      const toolbox = new Offcanvas(`Toolbox`, {location:'start'});
      navbar.add(toolbox);

      const propertiesPane = new Offcanvas(`Properties`, {location:'end'});
      navbar.add(propertiesPane);

      const debuggerOutput = new Offcanvas(`Debugger`, {location:'bottom'});
      navbar.add(debuggerOutput);

      navbar.setup();
      navbar.render(view.element);

      this.cleanup(navbar);
  }

}
