import Node from './lib/Node.js';
import Link from './lib/Link.js';
import Type from './lib/Type.js';
import Port from './lib/Port.js';
import Shelf from './lib/Shelf.js';

export default class NodeTree {

  #subscribers = [];

  constructor() {
    this.shelf = [];
    this.types = [];
    this.ports = [];
    this.nodes = [];
    this.links = [];

    this.start = null;
  }

  registerShelf(name, description) {
    const shelf = new Shelf(name, description);
    this.shelf.push(shelf);
    this.notifySubscribers("shelf", this.shelf);
    return shelf;
  }

  registerPort(name, defaults, allow) {
    const type = new Type(name, defaults, allow);
    this.ports.push(type);
    this.notifySubscribers("ports", this.ports);
    return type;
  }
  registerType(category, name, defaults, evaluate) {
    const type = new Type(category, name, defaults, evaluate);
    this.types.push(type);
    this.notifySubscribers("types", this.types);

    return type;
  }
  createNode(name, typeName, data) {
    const type = this.types.find((o) => o.name === typeName);
    const node = new Node(name, type, data);
    this.nodes.push(node);
    this.notifySubscribers("nodes", this.nodes);
    return node;
  }



  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }

  getNodeByName(name) {
    return this.nodes.find((node) => node.name === name);
  }

  setStart(node) {
    this.start = node;
  }

  link(socketFrom, socketTo) {
    const link = new Link(socketFrom, socketTo);
    this.links.push(link);

    // Find nodes based on socket names and connect them
    const fromNode = this.getNodeByName(socketFrom);
    const toNode = this.getNodeByName(socketTo);

    if (fromNode && toNode) {
      fromNode.outputs.push(toNode);
      toNode.inputs.push(fromNode);
    }
  }

  removeLink(link) {
    const index = this.links.indexOf(link);
    if (index !== -1) {
      this.links.splice(index, 1);
    }
  }


  evaluate() {
        // Evaluate the entire node tree
        // return this.nodes.map(node => node.evaluate());
        return this.activeNode ? this.activeNode.evaluate() : null;

      }
 


  subscribe(callback) {
    this.#subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.#subscribers = this.#subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }
  notifySubscribers(propertyName, newValue) {

    if(['shelf', 'ports', 'types', 'nodes'].includes(propertyName)) this.notifySubscribers('library', this.getLibrary());

    this.#subscribers.forEach((subscriber) => {
      subscriber(propertyName, newValue);
    });
  }


  // getLibrary(){
  //   return this.types.reduce((list, item)=>list.includes(item.category)?list:[...list, item.category],[]).map(category=>({name:category, data:this.types.filter(x=>x.category===category)}));
  // }
  getLibrary() {
      const uniqueCategories = [];
      const categorizedData = [];
      for (const item of this.types) {
          if (!uniqueCategories.includes(item.category)) {
              uniqueCategories.push(item.category);
          }
      }
      for (const category of uniqueCategories) {
          const categoryData = this.types.filter(type => type.category === category);
          categorizedData.push({ name: category, data: categoryData });
      }
      return categorizedData;
  }


}
