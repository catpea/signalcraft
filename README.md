# signalcraft
A tiny visual programming language.

## Building
npm install --save-exact --save-dev esbuild

## How It Works

- you define node types first
- then create a view, which is a UI, an SVG
- then you addNode(type) the view will update to show that node
- then you linkNodes to create a flow (see src/usage.js)
- then you .run(node), you have to specify a node you want to spuder up and execute pauload on

## How It Really Works

- System Is Reactive, Full Time Travel
- When defining Types, you really just specify Input Dots and Reply Dots.
- Input is the Property of a Node that you can link to
- Reply is the Function of a Node that gets executed via a downstream node
- Nodes are decorated as Panels
- Edges are decorated as Cables
- Reactivity Links everything together.

## TODO

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
