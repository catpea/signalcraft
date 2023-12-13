#!/usr/bin/env node
import chalk from 'chalk';
const pass = chalk.green;
const fail = chalk.yellow.bgRed; // Orange color


import {Vbox} from "../src/application/ui/view/ux/Vbox.js";


const vboxRoot = new Vbox('vboxRoot', );
const vboxChildPod1 = new Vbox('vboxChildPod1', );
const vboxChildPod2 = new Vbox('vboxChildPod2', );
const vboxChildPod1Line1 = new Vbox('vboxChildPod1Line1', {height:10});
const vboxChildPod1Line2 = new Vbox('vboxChildPod1Line2', {height:10});
const vboxChildPod2Line1 = new Vbox('vboxChildPod2Line1', {width:200, height:10}); // Added some widths for test
const vboxChildPod2Line2 = new Vbox('vboxChildPod2Line2', {width:200, height:10}); // Added some widths for test
const vboxChildPod2Line3 = new Vbox('vboxChildPod2Line3', {width:200, height:10}); // Added some widths for test
const vboxChildPod2Line4 = new Vbox('vboxChildPod2Line4', {width:200, height:10}); // Added some widths for test



vboxRoot.addChild(vboxChildPod1);
vboxRoot.addChild(vboxChildPod2);

vboxChildPod1.addChild(vboxChildPod1Line1);
vboxChildPod1.addChild(vboxChildPod1Line2);

vboxChildPod2.addChild(vboxChildPod2Line1);
vboxChildPod2.addChild(vboxChildPod2Line2);
vboxChildPod2.addChild(vboxChildPod2Line3);
vboxChildPod2.addChild(vboxChildPod2Line4);

// do all the calculations
vboxRoot.calculateLayout();


console.log( 'Pod 1 Height', vboxChildPod1.getComputedLayout().height ); // height will be 0
console.log( 'Pod 3 Height', vboxChildPod2.getComputedLayout().height ); // height will be 40 because vboxChildPod2Line1, vboxChildPod2Line2, vboxChildPod2Line3, vboxChildPod2Line4 each adds 10



function test( message, actual, expected ){
  if(actual==expected){
    console.log(pass(`PASS:`) + ` ${message} ... ${actual}`);
  }else{
    console.log(fail(`FAIL:`) + ` ${message} failure: expected "${expected}" got "${actual}"`);
    // process.exit(1);
  }
}
