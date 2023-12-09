# signalcraft
A tiny visual programming language.

## Building
npm install --save-exact --save-dev esbuild

## Sub Systems

- ```Brain.js``` main class
- ```craft.js``` instantiation of main class
  - ```tasks```: boot up the system
- ```usage.js``` just the part that the user should see, so that they don't get confused

### Core

- ```brain```: main application stuff
  - ```dream```: API for the user
  - ```setup```: core data structures
  - ```theme```: theme setup
  - ```views```: GUI, this is where the GUI gets booted up

### Data

- ```types```: node types, or node definition
- ```panel```: visual (SVG) representation of a node
  - ```nodes```: how the apps are made
    - ```input```: these are the data objects that represent properties that the user can plug into
    - ```reply```: data objects the user can connect to input of anoter node
- ```cable```: visual (SVG) representation of an edge
  - ```edges```: Objects that connect nodes

### Util

- ```domek```: DOM helper that does set attribute for us
- ```tools```: development tools

## How It Works

- you define node types first
- then create a view, which is a UI, an SVG
- then you addNode(type) the view will update to show that node
- then you linkNodes to create a flow (see src/usage.js)
- then you .run(node), you have to specify a node you want to spider up and execute payload on

## How It Really Works

- System Is Reactive, Full Time Travel
- When defining Types, you really just specify Input Dots and Reply Dots.
- Input is the Property of a Node that you can link to
- Reply is the Function of a Node that gets executed via a downstream node
- Nodes are decorated as Panels
- Edges are decorated as Cables
- Reactivity Links everything together.

## TODO

- INput/Reply must be reactive as they will give cable its x and y
- CRITICAL: SimpleCollection.export needs to make proper copies,

- use Krita to create system diagram
- implement cables/wires
- cables should be type sensitive numbers, strings, objects
- Paint edges
- Add Drag & Drop
- Add Selection Manager (maybe groups)

### Design Ideas

![art/fui-0.jpg](art/fui-0.jpg)
![art/fui-1.jpg](art/fui-1.jpg)
![art/fui-2.jpg](art/fui-2.jpg)
![art/fui-3.jpg](art/fui-3.jpg)
![art/fui-4.jpg](art/fui-4.jpg)
![art/fui-5.jpg](art/fui-5.jpg)
![art/fui-6.jpg](art/fui-6.jpg)
![art/fui-7.jpg](art/fui-7.jpg)
![art/fui-8.jpg](art/fui-8.jpg)
![art/fui-9.jpg](art/fui-9.jpg)
![art/fui-10.jpg](art/fui-10.jpg)
![art/fui-11.jpg](art/fui-11.jpg)

### Current State
![art/fui-x.jpg](art/fui-x.jpg)
![art/fui-y.jpg](art/fui-y.jpg)
