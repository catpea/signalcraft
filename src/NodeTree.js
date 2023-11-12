import Node from './Node.js';
import Link from './Link.js';

export default class NodeTree {
  constructor() {
    this.types = [];
    this.nodes = [];
    this.links = [];
    this.activeNode = null;
  }

  newNode(name, operation, x, y) {
    const node = new Node(name, operation, x, y);
    this.nodes.push(node);
    return node;
  }

  newNode(name, type, x, y) {
    const node = new Node(name, operation, x, y);
    this.nodes.push(node);
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

  setActiveNode(node) {
    this.activeNode = node;
  }

  createLink(socketFrom, socketTo) {
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

  // evaluate() {
  //       // Evaluate the entire node tree based on links
  //       const evaluatedNodes = new Set();
  //
  //       function evaluateNode(node) {
  //         // Check if the node has already been evaluated
  //         if (evaluatedNodes.has(node)) {
  //           return;
  //         }
  //
  //         // Evaluate inputs first
  //         node.inputs.forEach(input => evaluateNode(input));
  //
  //         // Evaluate the node itself
  //         node.evaluate();
  //
  //         // Mark the node as evaluated
  //         evaluatedNodes.add(node);
  //       }
  //
  //       // Evaluate nodes based on links
  //       this.links.forEach(link => {
  //         const fromNode = this.getNodeByName(link.socketFrom);
  //         const toNode = this.getNodeByName(link.socketTo);
  //         if (fromNode && toNode) {
  //           evaluateNode(fromNode);
  //         }
  //       });
  //
  //       // Return the evaluation result of the active node (you can modify this based on your requirements)
        // return this.activeNode ? this.activeNode.evaluate() : null;
  //     }


}
