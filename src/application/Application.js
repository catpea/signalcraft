import ReactiveArray  from './system/ReactiveArray.js';
import ReactiveObject from './system/ReactiveObject.js';

import Api from "./Api.js";
import UserTheme from "../Theme.js";

import Type from './model/Type.js';
import Node from './model/Node.js';
import Input from './model/node/Input.js';
import Reply from './model/node/Reply.js';
import Edge from './model/Edge.js';
import View from './ui/View.js';

export default class Brain extends ReactiveObject {

  Setup; // Application Configuration
  Theme; // Color/UI Theme
  Types; // Node Library
  Nodes; // Node Instances
  Edges; // Node Connections
  Views; // Node UI
  Dream; // User API

  // All the classes used throughout the system are stored here
  Object = {
    // Basics
    ReactiveArray,
    ReactiveObject,

    // Installation
    Type,

    // Data Structure
    Node,
      Input,
      Reply,
    Edge,

    // Rendering Of Data Structure
    View,

  };

  constructor() {
    super();
    this.Types = new ReactiveArray({root:this, Item:Type, auto:false }); // This is where node library resides
    this.Nodes = new ReactiveArray({root:this, Item:Node, auto:true }); // all nodes the user is working with
    this.Edges = new ReactiveArray({root:this, Item:Edge, auto:true }); // all edges that connect nodes
    this.Views = new ReactiveArray({root:this, Item:View, auto:false}); // this is the screen, multiple screens are supported
    this.Setup = new ReactiveObject(this, { title: "Signalcraft Visual Programming Language System" }); // Reactive Application Configuration
    this.Theme = new UserTheme(this); // Theme Of Choice
    this.Dream = new Api(this); // Pretty Dream API *FOR USER ONLY* eveything must be informative!
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
    this.Edges.stop();
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
          case "Edges":
            this.Edges.subscribe(eventName, handlerFunction.bind(that));
            break;
          default:
        }
      }
    }
  }

}
