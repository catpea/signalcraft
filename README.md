# signalcraft
A tiny visual programming language.

## TODO

### Urgent!

- Configure Connect Ports (requires removal of unused properties and simplification)
- Investigate container as the key mechanism in Context control

### Main

- Drag Cable at any point to take over XY of destination?

- Node Property Editor (YAML First)

- Cable Delete & Remove

- Remove Node w/t Cable Clean-up
- Cable Type Sensitivity - Should be type sensitive numbers, strings, objects.
- Add Node Selection Manager (maybe groups, maybe lasso select with boolean math)

- consider bounds padding to become a [0, 3, [0], [3]] with top right, bottom left like in CSS

- Update Theme + Multiple Themes
- Input/Output Line where both I/O ports visually align for neat programs (Line.js)

- Node Alignment And Z-Order Tools (Bring To Front, Send To Back)
- ForeignObjects in ZUI Mode

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
![art/fui-z.jpg](art/fui-z.jpg)
