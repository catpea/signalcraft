import ReactiveArray  from './system/ReactiveArray.js';
import ReactiveObject from './system/ReactiveObject.js';

import Api from "./Api.js";
import UserTheme from "../Theme.js";

import Archetype from './model/Archetype.js';
import Node from './model/Node.js';
import Input from './model/node/Input.js';
import Output from './model/node/Output.js';
import Connector from './model/Connector.js';
import Junction from './model/Junction.js';
import View from './ui/View.js';

import Selected from './model/Selected.js';

export default class Brain extends ReactiveObject {

  Setup; // Application Configuration
  Theme; // Color/UI Theme
  Archetypes; // Node Library
  Nodes; // Node Instances
  Connectors; // Port Connections, remember it is not that are connected but the ports of a node
  Views; // Node UI
  Dream; // User API

  Selection; // Selection

  constructor() {
    super();
    this.Archetypes = new ReactiveArray({application:this, Item:Archetype, auto:false }); // This is where node library resides
    this.Nodes = new ReactiveArray({application:this, Item:Node, auto:true }); // all nodes the user is working with
    this.Connectors = new ReactiveArray({application:this, Item:Connector, auto:true }); // all links (edges) that connect nodes
    this.Junctions = new ReactiveArray({application:this, Item:Junction, auto:true }); // all links (edges) that connect nodes
    this.Views = new ReactiveArray({application:this, Item:View, auto:false}); // this is the screen, multiple screens are supported

    this.Setup = new ReactiveObject(this, { title: "Signalcraft Visual Programming Language System" }); // Reactive Application Configuration
    this.Theme = new UserTheme(this); // Theme Of Choice
    this.Dream = new Api(this); // Pretty Dream API *FOR USER ONLY* eveything must be informative!

    // Extended Concepts
    this.Selection = new ReactiveArray({application:this, Item:Selected}); // this is the screen, multiple screens are supported
    this.Shortcuts = {
      isDeleting: e=>e.code=='Delete',
      isSelecting: e=>e.ctrlKey,
      // selecting2: e=>e.ctrlKey&&shiftKey,

    }
  }

  async start() {
    // TODO: boot procedure
    // .Views could be started here
    this.Views.start(); // starts the user interface
  }

  async stop() {
    //TODO: destroy all listeners
    this.Views.stop();
    this.Nodes.stop();
    this.Connectors.stop();
  }








  // this is a binder patterened after Backbone, not great but not terrible
  integrate(that, map) {
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const [objectName, eventName, fluff] = key.split(" ");
        const handlerFunction = map[key];
        switch (objectName) {
          case "Setup":
            this.Setup.subscribe(eventName, handlerFunction.bind(that));
            break;
          case "Nodes":
            this.Nodes.subscribe(eventName, handlerFunction.bind(that));
            break;
          case "Connectors":
            this.Connectors.subscribe(eventName, handlerFunction.bind(that));
            break;
          default:
        }
      }
    }
  }

}
