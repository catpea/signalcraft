#!/usr/bin/env node

import Box from "../src/theme/Box.js";

const main = new Box({ w: 300 });

const caption1 = new Box({ h: 10 });
const inputs = new Box();
const outputs = new Box();
const box1 = new Box({h:10});
const box2 = new Box({h:10});
const box1b = new Box({h:10});
const box2b = new Box({h:10});
const box3b = new Box({h:10});

main.append(caption1);

main.append(outputs);
main.append(inputs);

inputs.append(box1);
inputs.append(box2);
outputs.append(box1b);
outputs.append(box2b);
outputs.append(box3b);
main.finalCalculate();
main.finalCalculate();

console.log( 'caption1.y', caption1.y );
console.log( 'inputs.y', inputs.y );
console.log( 'outputs.y', outputs.y );
console.log( 'box1.y', box1.y );
console.log( 'box2.y', box2.y );
console.log( 'box1b.y', box1b.y );
console.log( 'box2b.y', box2b.y );
console.log( 'box3b.y', box3b.y );

// inputs.fill(3, { h: 1 });


//
console.log({
  height: main.totalHeight,
  inputs: inputs.children.map((o) => o.y),
  outputs: outputs.children.map((o) => o.y),
});
