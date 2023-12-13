#!/usr/bin/env node
import chalk from 'chalk';
const pass = chalk.green;
const fail = chalk.yellow.bgRed; // Orange color


import Container from "../src/application/ui/view/ux/Container.js";


const TEST_MARGIN = 3;
const TEST_PADDING = 2;
const TEST_GAP = 1;

if(0){
  let gap = 0;
  const container = new Container('root');
  container.setBounds({gap: TEST_GAP});
  const firstChild =  new Container('child1');
  const secondChild = new Container('child2');
  const thirdChild =  new Container('child3');
  const fourthChild =  new Container('child4');

  container.add(firstChild);
  test('y of first child', firstChild.y, 0);

  container.add(secondChild);
  gap+=TEST_GAP
  test('y of second child', secondChild.y, gap);

  container.add(thirdChild);
  gap+=TEST_GAP
  test('y of third child', thirdChild.y, gap);

  container.add(fourthChild);
  gap+=TEST_GAP
  test('y of fourth child', fourthChild.y, gap);
}


if(1){
const container = new Container('root');

container.setBounds({height: 10});
let height = 10;
test('just height', container.height, 10);

container.setBounds({padding: TEST_PADDING});
height+=(TEST_PADDING*2);
test('padding', container.height, height);

container.setBounds({margin: TEST_MARGIN});
height+=(TEST_MARGIN*2);
test('margin', container.height, height);

container.setBounds({gap: TEST_GAP});
height+=0;
test('no children but has gap set', container.height, height);


const firstChild = new Container('child1');

firstChild.setBounds({height: 20});
height+=20;

container.add(firstChild);
// console.log( firstChild.above );

const secondChild = new Container('child2');
container.add(secondChild);


// console.log( secondChild.above );

container.setBounds();
height+=TEST_GAP;
test('two children and has gap set', container.height, height);

const thirdChild = new Container('child3');
container.add(thirdChild);


test('y of root', container.y, 0);
let y = TEST_MARGIN+TEST_PADDING;
test('y of first child', firstChild.y, y);

y+=20;
y+=TEST_GAP;
test('y of second child', secondChild.y, y);

y+=TEST_GAP;
test('y of third child', thirdChild.y, y);
}














function test( message, actual, expected ){
  if(actual==expected){
    console.log(pass(`PASS:`) + ` ${message} ... ${actual}`);
  }else{
    console.log(fail(`FAIL:`) + ` ${message} failure: expected "${expected}" got "${actual}"`);
    // process.exit(1);
  }
}
