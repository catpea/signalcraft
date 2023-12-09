#!/usr/bin/env node

import assert from 'node:assert';
import {app} from './src/local.js';

// setup components
const stringA = app.addNode("text/string", {value: "a"} );
const stringB = app.addNode("text/string", {value: "b"} );
const arrayJn = app.addNode("array/join");

// create a flow between compoents
app.linkPorts(stringA, arrayJn);
app.linkPorts(stringB, arrayJn);

// run program;
const actual = await app.run(arrayJn);

// tst
deepEqual(actual, expect, 'test failed')
