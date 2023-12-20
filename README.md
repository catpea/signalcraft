# signalcraft
A tiny visual programming language.

## Usage

CTRL+Click on caption or cable will select it.

## TODO

### Bug Fix


- Omni port should only connect to left ports, never right, (it can be deleted and recreated in that case, or SHIFT+Drag can be setup)
- Drag Connecting lines between entire Line.js not just Port, it is easier to hit the targer
- too hard to click on caption, at certain scale make the entire node draggable
- default action for drag should be selection manager not panning, see NodeRED

### Urgent!

- src/application/execute/Standard.js Must Recognize Juncion Objects
- Finish Toolbox
- Add Property Toolbox
- Live Data Output Bottom Debugger

- Add minimal previews to nodes (string, number color, etc...)
- RPi Friendly Theme (zionui?)
- Add Node Deletion and Link Cleanup
- LOD: on scale 2+ show string preview in Line via FOreignObject

### Main
- Add A Game Like Tutorial with Achievement unlocked
- Use OOP as the DX Interface for node creation.

- Drag Cable at any point to take over XY of destination?

- Node Property Editor (YAML First)

- Remove Node w/t Cable Clean-up
- Cable Type Sensitivity - Should be type sensitive numbers, strings, objects.
- Add Node Selection Manager (maybe groups, maybe lasso select with boolean math)

- consider bounds padding to become a [0, 3, [0], [3]] with top right, bottom left like in CSS

- Update Theme + Multiple Themes
- Input/Output Line where both I/O ports visually align for neat programs (Line.js)

- Node Alignment And Z-Order Tools (Bring To Front, Send To Back)
- ForeignObjects in ZUI Mode
- Add Node Search And Canvas Scroll

- Give TODOM multiple code generation profiles

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

### Current State
![art/fui-c.jpg](art/fui-d.jpg)
![art/fui-c.jpg](art/fui-c.jpg)
![art/fui-b.jpg](art/fui-b.jpg)
![art/fui-a.jpg](art/fui-a.jpg)
![art/fui-z.jpg](art/fui-z.jpg)
![art/fui-y.jpg](art/fui-y.jpg)
![art/fui-x.jpg](art/fui-x.jpg)

### Design Ideas

![art/fui-12.jpg](art/fui-12.jpg)
![art/fui-11.jpg](art/fui-11.jpg)
![art/fui-10.jpg](art/fui-10.jpg)
![art/fui-9.jpg](art/fui-9.jpg)
![art/fui-8.jpg](art/fui-8.jpg)
![art/fui-7.jpg](art/fui-7.jpg)
![art/fui-6.jpg](art/fui-6.jpg)
![art/fui-5.jpg](art/fui-5.jpg)
![art/fui-4.jpg](art/fui-4.jpg)
![art/fui-3.jpg](art/fui-3.jpg)
![art/fui-2.jpg](art/fui-2.jpg)
![art/fui-1.jpg](art/fui-1.jpg)
![art/fui-0.jpg](art/fui-0.jpg)
