import startCase from 'lodash/startCase';

import oneOf from "oneof";
import { html, svg, text, list, update, JSONWriter, JSONReader } from "domek";

import Base from './Base.js';

import Navbar from "./menu/Navbar.js";
import Dropdown from "./menu/Dropdown.js";
import Offcanvas from "./menu/Offcanvas.js";

export default class Menus extends Base {

  start(view){

    const {Api, Themes} = view.application;


      const navbar = new Navbar(view.name);
      navbar.setView(view);

      const fileMenu = new Dropdown(`File`);
      fileMenu.setData([
        {
          caption: 'Open File...',
          program: async ()=>Api.load(await JSONReader()),
        },
        {
          caption: 'Save As...',
          program: ()=>JSONWriter(JSON.stringify(Api.save(), null, 2)),
        },
        // '---------------------------------------------------------------',
        'Project Templates',
        {
          caption: 'Hello World',
          program: async ()=>Api.load( await (await fetch("./templates/hello-world.json")).json() ),
        },
        {
          caption: 'Nostromo',
          program: async ()=>Api.load( await (await fetch("./templates/nostromo.json")).json() ),
        },

      ])
      navbar.add(fileMenu);




      const themeMenu = new Dropdown(`Theme`);
      const themes =()=>Themes.map(theme=>({caption: startCase(theme.name), selected: theme.name==Api.selectedTheme(), program: ()=>Api.selectTheme(theme.name)}));

      //console.log(Themes.content);
      //console.log(themes());
      themeMenu.setData(themes())

      view.application.Setup.observe('theme', (v)=>{
        themeMenu.setData(Themes.map(theme=>({caption: startCase(theme.name), selected: theme.name==Api.selectedTheme(), program: ()=>Api.selectTheme(theme.name)})))
        themeMenu.update()
      }, false)

      navbar.add(themeMenu);

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
