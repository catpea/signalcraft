#!/usr/bin/env node

import NodeTree from "./src/NodeTree.js";
import Node from "./src/Node.js";
import Link from "./src/Link.js";

// Example usage
const nodeTree = new NodeTree();

// const node1 = nodeTree.newNode("Data Node 1", (sum, input)=>{ console.log(`got ${sum} and ${input}.`); return 2}, 100, 100);
// const node3 = nodeTree.newNode("Node 3", (sum, input)=>{ console.log(`got ${sum} and ${input}.`); return 7}, 200, 200);

const type0 = nodeTree.newType(
  {
    name: "JavaScript Value",
    value: -7,
  },
  instance => instance.data
);
const type1 = nodeTree.newType(
  {
    name: "Addition Node",
  },
  instance => (sum, data) sum + data,
);

const type2 = nodeTree.newType(
  {
    name: "Multiplication Node",
  },
  instance => (sum, data) sum * data,
);

const type3 = nodeTree.newType(
  {
    name: "Kitchen Sink",
    value: 2,
    color: "red",
    weight: 5,
  },
  instance => instance.number
);

// const node1 = nodeTree.newNode("Data Node 1", 2, 100, 100);


const node1 = nodeTree.newNode("Node 1", "Kitchen Sink",     {weight: 1});
const node2 = nodeTree.newNode("Node 2", "JavaScript Value", {value: 5});
const node3 = nodeTree.newNode("Node 3", "Addition Node");
const node4 = nodeTree.newNode("Node 4", "JavaScript Value", {value: 5});
const node5 = nodeTree.newNode("Node 5", "Multiplication Node");

nodeTree.createLink("Node 1", "Node 3");
nodeTree.createLink("Node 2", "Node 3");
nodeTree.createLink("Node 3", "Node 5");
nodeTree.createLink("Node 4", "Node 5");

//
// console.log(node1.dump());

nodeTree.setActiveNode(node5);
console.log("Evaluation Result:", nodeTree.evaluate());
