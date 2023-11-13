#!/usr/bin/env node

import NodeTree from './src/NodeTree.js';

// Configuring The System
const nodeTree = new NodeTree();

// What ports are supported in this program:
const port0 = nodeTree.registerPort( 'Note',     {value: ''}, ['String'] );
const port1 = nodeTree.registerPort( 'Number',   {value: 0}, ['Number'] );
const port2 = nodeTree.registerPort( 'Color',    {value: 'red'}, ['Number', 'Object'] );
const port3 = nodeTree.registerPort( 'Code',     {value: 'function(in){return in;}'}, ['String'] );

// What node types are available.
const type0 = nodeTree.registerType( 'Data', 'Value', ['Number'], (instance) => instance.value );
const type1 = nodeTree.registerType( 'Math', 'Addition Node', ['Note'], (dependencies, data) => dependencies.reduce((sum,val)=>sum+val,0), );
const type2 = nodeTree.registerType( 'Math', 'Multiplication Node', ['Note'], (dependencies, data) => dependencies.reduce((sum,val)=>sum*val,0), );
const type3 = nodeTree.registerType( 'Demo', 'Kitchen Sink', ['Number', 'Color', 'Code'], (instance) => instance.number );

console.log('Library', nodeTree.dumpLibrary());



// Building a program.


const node1 = nodeTree.createNode('Node 1', 'Kitchen Sink',     {weight: 1});
const node2 = nodeTree.createNode('Node 2', 'JavaScript Value', {value: 5});
const node3 = nodeTree.createNode('Node 3', 'Addition Node');
const node4 = nodeTree.createNode('Node 4', 'JavaScript Value', {value: 5});
const node5 = nodeTree.createNode('Node 5', 'Multiplication Node');

console.log('Created Nodes', nodeTree.dumpNodes().map(o=>`${o.name} (${o.type.name})`));

nodeTree.linkPorts('Node 1', 'out', 'Node 3', 'in');
nodeTree.linkPorts('Node 2', 'out', 'Node 3', 'in');
nodeTree.linkPorts('Node 3', 'out', 'Node 5', 'in');
nodeTree.linkPorts('Node 4', 'out', 'Node 5', 'in');

nodeTree.setPrimaryNode(node5);
nodeTree.subscribe( output => console.log(output) );
nodeTree.start();

let testValue = 1;
setInterval(function(){
  node1.send('in', testValue);
  testValue++;
}, 1_000);

// console.log('Evaluation Result:', nodeTree.evaluate());
